import SubtaskGuide from "../grading/subtaskGuide";
import { AdditiveGuidelineTree } from "../trees/grading/additiveGuidelineTree";
import State from "../state";
import { GradeType } from "../trees/gradeType";
import G = require("glob");

export default function (guide : SubtaskGuide, guidelineTree : AdditiveGuidelineTree)
{
    if (guide.hasMaxPoints())
        guide.setPoints(0);
    else if (guide.points === 0)
        guide.setPoints(guide.maxPoints);
    guidelineTree.refresh();

    State.setGuidelines(guidelineTree);
}