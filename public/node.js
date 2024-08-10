class QuadtreeNode {

    constructor(x, y, dimX, dimY) {
        this.children = []
        this.x = x
        this.y = y
        this.dimX = dimX
        this.dimY = dimY

        this.c1x = x - dimX/2
        this.c1y = y - dimY/2

        this.c2x = x + dimX/2
        this.c2y = y - dimY/2

        this.c3x = x - dimX/2
        this.c3y = y + dimY/2

        this.c4x = x + dimX/2
        this.c4y = y + dimY/2

        this.diag = sqrt(dimX*dimX + dimY*dimY)
    }

    isFishInsideCorner(cx, cy, fish, fishRadius) {
        // let dx = cx - fish.x
        // let dy = cy - fish.y
        // let dist = sqrt(dx*dx + dy*dy)

        // return dist < (this.diag + fishRadius/2)
        return fish.queryDistance(cx, cy) < this.diag
    }

    refine(fishes, fishRadius, depth) {
        // corner 1

        if (depth > 9) {
            return;
        }

        let shouldRefine = false;
        for (let i = 0; i < fishes.length; i++) {
            // print(i)
            // option 1
            // shouldRefine = this.isFishInsideCorner(this.c1x, this.c1y, fishes[i], fishRadius) && this.isFishInsideCorner(this.c2x, this.c2y, fishes[i], fishRadius) && this.isFishInsideCorner(this.c3x, this.c3y, fishes[i], fishRadius) && this.isFishInsideCorner(this.c4x, this.c4y, fishes[i], fishRadius)
            let shouldRefine1 = this.isFishInsideCorner(this.c1x, this.c1y, fishes[i], fishRadius)
            let shouldRefine2 = this.isFishInsideCorner(this.c2x, this.c2y, fishes[i], fishRadius)
            let shouldRefine3 = this.isFishInsideCorner(this.c3x, this.c3y, fishes[i], fishRadius)
            let shouldRefine4 = this.isFishInsideCorner(this.c4x, this.c4y, fishes[i], fishRadius)

            shouldRefine = shouldRefine1 && shouldRefine2 && shouldRefine3 && shouldRefine4

            if (shouldRefine) {
                break;
            }
            
            
            // option 2
            // if (this.isFishInsideCorner(this.c1x, this.c1y, fishes[i], fishRadius)) {
            //     shouldRefine = true;
            // }
            // else if (this.isFishInsideCorner(this.c2x, this.c2y, fishes[i], fishRadius)) {
            //     shouldRefine = true;
            // }
            // else if (this.isFishInsideCorner(this.c3x, this.c3y, fishes[i], fishRadius)) {
            //     shouldRefine = true;
            // }
            // else if (this.isFishInsideCorner(this.c4x, this.c4y, fishes[i], fishRadius)) {
            //     shouldRefine = true;
            // }
        }
        if (shouldRefine) {
            this.createChildren(fishes, fishRadius, depth)
        }
    }

    createChildren(fishes, fishRadius, depth) {
        // new child 1
        let newc1x = this.x - this.dimX/4
        let newc1y = this.y - this.dimY/4

        let newc2x = this.x + this.dimX/4
        let newc2y = this.y - this.dimY/4

        let newc3x = this.x - this.dimX/4
        let newc3y = this.y + this.dimY/4

        let newc4x = this.x + this.dimX/4
        let newc4y = this.y + this.dimY/4

        let newc1 = new QuadtreeNode(newc1x, newc1y, this.dimX/2, this.dimY/2)
        let newc2 = new QuadtreeNode(newc2x, newc2y, this.dimX/2, this.dimY/2)
        let newc3 = new QuadtreeNode(newc3x, newc3y, this.dimX/2, this.dimY/2)
        let newc4 = new QuadtreeNode(newc4x, newc4y, this.dimX/2, this.dimY/2)

        newc1.refine(fishes, fishRadius, depth + 1);
        newc2.refine(fishes, fishRadius, depth + 1);
        newc3.refine(fishes, fishRadius, depth + 1);
        newc4.refine(fishes, fishRadius, depth + 1);

        this.children = [newc1, newc2, newc3, newc4]
    }

    draw() {
        if (this.children.length > 0) {
            push()
            stroke(255)
            strokeWeight(1);
            line(this.x - this.dimX/2, this.y, this.x + this.dimX/2, this.y)
            line(this.x, this.y - this.dimY/2, this.x, this.y + this.dimY/2)
            pop()

            for (let i = 0; i < this.children.length; i++) {
                this.children[i].draw();
            }
        }
    }

}