import SubtaskGuide from "../grading/subtaskGuide";
import { AdditiveGuidelineTree } from "../trees/grading/additiveGuidelineTree";

export default function (guide : SubtaskGuide, guidelineTree : AdditiveGuidelineTree)
{
    guide.selected = !guide.selected;
    guidelineTree.refresh();
}