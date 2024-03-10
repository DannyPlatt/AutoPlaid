# AutoPlaid
Using p5.js to create designs based on simple sin and cos functions

## Using AutoPlaid
Interactive content can be accessed via [This Github Page.](https://dannyplatt.github.io/AutoPlaid/)

AutoPlaid plays with the properties of [Lissajous curves](https://en.wikipedia.org/wiki/Lissajous_curve)
Press the arrow keys to change the multiplier within the sin and cos functions:
```.js
x = cos(i*XangleMod)* radius;
y = sin(i*YangleMod)* radius;
```
As the variable i increases at a constant rate, XangleMod and YangleMod cause the changes in shape

#### Example:
With `XangleMod = 1` and `YangleMod = 1`, Both modulators are equal, resulting in a circle. 
If `XangleMod = 2` and `YangleMod = 1`, The shape will traveres the horizontal plane twice for every 1 Y traversal, resulting in a modfied shape. 
These basic Lissajou figures can then be further modified by changing paramaters such as iConst, growthCost, and growth speed. Current designs generated are results of modification to these parameters.
