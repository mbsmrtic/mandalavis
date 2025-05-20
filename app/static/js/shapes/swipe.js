import { CompositeShape, MandalaShape } from "./mandalashape.js";

// Either a swipe on the left side of a circle, or on the right side
export class CircleSwipe extends MandalaShape {
}

// This class has both a left and right circle swipe
export class CircleSwipes extends CompositeShape {

}

//Either a swipe on the left side of a curly bracket or on the right side
export class BracketSwipe extends MandalaShape {
}

// Has both a left and a right bracket swipe
export class BracketSwipes extends CompositeShape {

}
