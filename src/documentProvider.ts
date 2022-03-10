import * as vscode from 'vscode';

export class DocumentProvider implements vscode.TextDocumentContentProvider {
    provideTextDocumentContent(uri: vscode.Uri, token: vscode.CancellationToken): vscode.ProviderResult<string> {
        return `package main.java.book_information;

        import java.util.TreeSet;
        
        public class Book implements Comparable<Book>
        {
            String title;
            int pages;
            String author;
            String publisher;
            int edition;
            //uncomment it. make sure you use the right names of getter methods in the toString()
        
            public Book(String title, int pages, String author, String publisher, int edition) {
                this.title = title;
                this.pages = pages;
                this.author = author;
                this.publisher = publisher;
                this.edition = edition;
            }
        
            public String getTitle() {
                return title;
            }
        
            public int getPages() {
                return pages;
            }
        
            public String getAuthor() {
                return author;
            }
        
            public String getPublisher() {
                return publisher;
            }
        
            public int getEdition() {
                return edition;
            }
        
            @Override
            public String toString() {
                return String.format("%s  \t %d  \t %s \t %s \t %d\n",getTitle(), getPages(), getAuthor(), getPublisher(),getEdition());
            }
        
            @Override
            public int compareTo(Book b) {
                return Integer.compare(this.getPages(),b.getPages());
            }
        
            public static void main(String[] args) {
                TreeSet<Book> bookSet1 = new TreeSet();
                bookSet1.add(new Book("Core Java",	928,"Cay S. Horstmann","Pearson",11));
                bookSet1.add(new Book("Effective Java",412,"Joshua Bloch Addison",	"Wesley",3));
                bookSet1.add(new Book("Java: A Beginner's Guide",720,"Herbert Schildt","McGraw-Hill Education",8));
                bookSet1.add(new Book("Java The Complete Reference",1248,"Herbert Schildt","McGraw-Hill Education",11));
                bookSet1.add(new Book("Thinking in Java",562,"Bruce Eckel","Pearson",2));
        
                TreeSet<Book> bookSet2 = new TreeSet(new EditionComparator());
                bookSet2.addAll(bookSet1);
        
                //Task 2a
                System.out.println("Sorting based on Pages");
                for(Book book : bookSet1){
                    System.out.println(book);
                }
                //Task 2b
                System.out.println("Sorting based on Edition");
                for(Book book : bookSet2){
                    System.out.println(book);
                }
            }
        
        }`;
    }

}