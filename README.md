# AutoPlaid
Using p5.js to create designs based on simple sin and cos functions

## Using AutoPlaid
Interactive content can be accessed via [This Github Page.](https://dannyplatt.github.io/AutoPlaid/)

AutoPlaid plays with the properties of [Lissajous curves](https://en.wikipedia.org/wiki/Lissajous_curve)
Pressing the arrow keys changes the angleMod modifiers within the sin and cos functions:
Pressing the spacebar removes drawn content

## Brief Explanation of modifiers
At the core of this code is this calculation:
```.js
x = cos(i*XangleMod)* radius;
y = sin(i*YangleMod)* radius;
```
As the variable i increases at a constant rate within the loop, XangleMod and YangleMod modify the shape.

With `XangleMod = 1` and `YangleMod = 1`, Both modulators are equal, resulting in a 1 to 1 ration between the x and y iterations. 
If `XangleMod = 2` and `YangleMod = 1`, The shape will traveres the horizontal plane twice for every 1 Y traversal, resulting in a modfied shape. 

These basic Lissajou figures can then be further modified by changing paramaters such as iConst, growthCost, and growth speed. Current designs generated are results of modification to these parameters.
```.js
iConst = 4.131415 / 2
growthSpeed = 30
growthConst = 0.1
```
Why such a specific iConst was chosen escapes me, but choosing iConst values with relation to radians ratios often lead to interesting results 

