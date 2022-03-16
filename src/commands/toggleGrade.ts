import SubtaskGuide from "../grading/subtaskGuide";
import { AdditiveGuidelineTree } from "../trees/grading/additiveGuidelineTree";
import State from "../state";

export default function (guide : SubtaskGuide, guidelineTree : AdditiveGuidelineTree)
{
    guide.selected = !guide.selected;
    guidelineTree.refresh();

    State.setGuidelines(guidelineTree);
}