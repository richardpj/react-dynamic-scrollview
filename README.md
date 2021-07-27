# Dynamic Scrollview Example

This is a simple create react app sample that you can `yarn start` to try out. The DynamicScrollView Component allows you to render extremely large lists in a scrollable view without the need for pagination. This is because only the visible rows are rendered and spacer divs are added to the scrollable div to account for he space taken by the offscreen elements.

It relies on passing a cheap row height calculation function so that element heights can be recalculated cheaply as the user scrolls.

The pattern is borrowed from the Cocoa UIListview component which applies a similar principle.

# Here be Dragons!

This code is untested and should not be reused in production without hardening. I very likely made some out by one errors and will not be held responsible for any issues with the code in this repository.
