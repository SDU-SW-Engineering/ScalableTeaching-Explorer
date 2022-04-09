import State from "../state";
import { Comment } from "../trees/commentItem";
import { AdditiveGuideline } from "../trees/grading/additiveGuideline";

export default function(menu : AdditiveGuideline | Comment) {
    if (menu instanceof AdditiveGuideline)
    {
        menu.guide.comment = null;
        menu.treeProvider.refresh();
        return;
    }

    menu.parent.comment = null;
    State.getGuidelines()?.refresh();
}