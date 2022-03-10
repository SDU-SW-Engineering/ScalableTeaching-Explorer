import { match } from "assert";
import { randomBytes } from "crypto";
import { env } from "process";
import Axios from 'axios';
import { authentication, AuthenticationProvider, AuthenticationProviderAuthenticationSessionsChangeEvent, AuthenticationSession, Disposable, Event, EventEmitter, ProgressLocation, SecretStorage, window } from "vscode";
import * as vscode from 'vscode';

export class ScalableTeachingAuthenticationProvider implements AuthenticationProvider, Disposable {
    static id = `ScalableTeachingPATH`;
    private static secretKey = "ScalableTeachingPAT";

    private currentToken: Promise<string | undefined> | undefined;
    private initializedDisposable: Disposable | undefined;
    private _onDidChangeSessions = new EventEmitter<AuthenticationProviderAuthenticationSessionsChangeEvent>();
    get onDidChangeSessions(): Event<AuthenticationProviderAuthenticationSessionsChangeEvent> {
        return this._onDidChangeSessions.event;
    }

    constructor(private readonly secretStorage: SecretStorage) { }

    dispose() {
        this.initializedDisposable?.dispose();
    }

    private ensureInitialized(): void {
        if (this.initializedDisposable !== undefined)
            return;

        void this.cacheTokenFromStorage();
        this.initializedDisposable = Disposable.from(this.secretStorage.onDidChange(e => {
            if (e.key === ScalableTeachingAuthenticationProvider.secretKey)
                void this.checkForUpdates();
        }), authentication.onDidChangeSessions(e => {
            if (e.provider.id === ScalableTeachingAuthenticationProvider.id)
                void this.checkForUpdates();
        }));
    }

    private async checkForUpdates(): Promise<void> {
        const added: AuthenticationSession[] = [];
        const removed: AuthenticationSession[] = [];
        const changed: AuthenticationSession[] = [];

        const previousToken = await this.currentToken;
        const session = (await this.getSessions())[0];

        if (session?.accessToken && !previousToken)
            added.push(session);
        else if (!session?.accessToken && previousToken)
            removed.push(session);
        else if (session?.accessToken !== previousToken)
            changed.push(session);
        else
            return;

        void this.cacheTokenFromStorage();
        this._onDidChangeSessions.fire({ added: added, removed: removed, changed: changed });
    }

    private cacheTokenFromStorage() {
        return this.secretStorage.get(ScalableTeachingAuthenticationProvider.secretKey) as Promise<string | undefined>;
    }

    async getSessions(scopes?: readonly string[]): Promise<readonly AuthenticationSession[]> {
        this.ensureInitialized();
        const token = await this.cacheTokenFromStorage();

        return token ? [new ScalableTeachingPatSession(token)] : [];
    }

    async createSession(scopes: readonly string[]): Promise<AuthenticationSession> {
        this.ensureInitialized();

        let token = await this.signInThroughBrowser();
  
        if (token === null)
            throw new Error("Fuck");

        await this.secretStorage.store(ScalableTeachingAuthenticationProvider.secretKey, token);
        vscode.window.showInformationMessage("Authenticated.");

        return new ScalableTeachingPatSession(token);
    }

    async removeSession(sessionId: string): Promise<void> {
        await this.secretStorage.delete(ScalableTeachingAuthenticationProvider.secretKey);
    }

    async signInThroughBrowser() : Promise<string | null>
    {
        let token : null | string = null;
        await window.withProgress({
            location: ProgressLocation.Notification,
            cancellable: false,
            title: "Attempting to sign you in"
        }, async () => {
            let authToken = randomBytes(32).toString("hex");
            vscode.env.openExternal(vscode.Uri.parse(`http://localhost:8080/vs-code/authenticate?token=${authToken}`));
            let tries = 0;
            while (tries < 3)
            {
                await new Promise(r => setTimeout(r, 3000));
                console.log("Sign in attempt: " + (tries+1));
                try
                {
                    let response = await Axios.get(`http://localhost:8080/vs-code/retrieve-authentication?token=${authToken}`);
                    token = response.data.token;
                    console.log(token);

                    return;
                } catch (ignored){}
                tries++;
            }
        });

        return token;
    }
}

class ScalableTeachingPatSession implements AuthenticationSession
{
    readonly account = {
        id: ScalableTeachingAuthenticationProvider.id,
        label: 'Personal Access Token'
    };

    readonly id = ScalableTeachingAuthenticationProvider.id;

    readonly scopes = [];

    constructor(public readonly accessToken: string) {}
}