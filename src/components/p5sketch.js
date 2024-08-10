import React from 'react';
import { ReactP5Wrapper } from "@p5-wrapper/react";
import p5 from "p5"


// parameters
let p = {
    // toggle filling screen or not
    fillScreen: false,
    color: false,
  
    // tile size
    numAgents: 5,
    numAgentsMin: 1,
    numAgentsMax: 250,
  
    // fish speed
    fishSpeed: 0.5,
    fishSpeedMin: 0,
    fishSpeedMax: 1,
    fishSpeedStep: 0.05,
  
    // shape scale
    shapeScale: 0.5,
    shapeScaleMin: 0.1,
    shapeScaleMax: 3,
    shapeScaleStep: 0.01,
  
    bboxScale: 3,
    bboxScaleMin: 0,
    bboxScaleMax: 5,
  };
  
  // list of agents
  let agents;

function sketch(p5) {

    p5.setup = () => {
        p5.createCanvas(p5.windowWidth, p5.windowHeight);
        p5.createAgents();
        // createAgents(p5.windowWidth, p5.windowHeight);
    }

    p5.draw = () => {
        p5.background(0);
        // p5.normalMaterial();
        // p5.push();
        // p5.rotateZ(p5.frameCount * 0.01);
        // p5.rotateX(p5.frameCount * 0.01);
        // p5.rotateY(p5.frameCount * 0.01);
        // p5.plane(100);
        // p5.pop();
        // console.log(agents)
        let quadtree = new QuadtreeNode(p5.windowWidth/2, p5.windowHeight/2, p5.windowWidth, p5.windowHeight)
        quadtree.refine(agents, 5, 0);

        quadtree.draw();

        // draw all the agents
        // if (shape != null) {
        for (let i = 0; i < agents.length; i++) {
          agents[i].update();
          // a.draw();
        }
    };

    p5.mousePressed = () => {
      p5.createAgents();
    }

    p5.createAgents = () => {
      agents = [];
  
      for (let i = 0; i < p.numAgents; i++) {
        let ex = p5.windowWidth
        let ey = p5.windowHeight
        let a = new Agent(p5.random(0, ex), p5.random(0, ey), i);
        agents.push(a)
      }
    }

    class Agent {
      // agent centre and shape
        x;
        y;
        shape;
      
        // local shape transforms
        sscale = 0.1;
        angle = 0.0;
      
        constructor(x, y, id) {
          this.id = id
          this.x = x;
          this.y = y;
        //   this.shape = shape;
          this.bbox_w = (this.sscale * p.shapeScale) * 1442;
          this.bbox_h = (this.sscale * p.shapeScale) * 495;
        }
      
        getX() {
          return this.x
        }
      
        getY() {
          return this.y
        }
      
        getID() {
          return this.id;
        }
      
        getOverlap(agent2) {
          if (this.id == agent2.getID()) {
            return 0;
          }
      
          let dx = p5.abs(this.x - agent2.getX());
          let dy = p5.abs(this.y - agent2.getY());
          if (dx < this.bbox_w && dy < this.bbox_h) {
            let percX = (this.bbox_w - dx) / this.bbox_w;
            let percY = (this.bbox_h - dy) / this.bbox_h;
            return percX*percY;
          }
          return 0;
        }
      
        length_squared(vx, vy, wx, wy) {
          let dx = vx - wx
          let dy = vy - wy
          return dx*dx + dy*dy
        }
      
        minimum_distance(vx, vy, wx, wy, px, py) {
          // Return minimum distance between line segment vw and point p
          let l2 = this.length_squared(vx, vy, wx, wy);  // i.e. |w-v|^2 -  avoid a sqrt
      
          if (l2 == 0.0) {
            return p5.sqrt(this.length_squared(vx, vy, px, py)); 
          }
      
          let dotres = (px - vx) * (wx - vx) + (py - vy) * (wy - vy)
          let t = p5.max(0, p5.min(1, dotres / l2));
      
          let projx = vx + t * (wx - vx)
          let projy = vy + t * (wy - vy)
          return p5.sqrt(this.length_squared(projx, projy, px, py));
        }
      
        queryDistance(px, py) {
      
          let fishWidth = 40
          let fishHeight = 13
          let tailHeight = 20
      
          let dy = p5.mouseY - this.y
          let dx = p5.mouseX - this.x
          let d = p5.sqrt(dy*dy + dx*dx)
          let dirx = dx / d
          let diry = dy / d
      
          let perpdirx = diry
          let perpdiry = -dirx
      
          let tailtheta1 = (5*p5.PI/4)
          let taildirx1 = p5.cos(tailtheta1) * dirx - p5.sin(tailtheta1) * diry
          let taildiry1 = p5.sin(tailtheta1) * dirx + p5.cos(tailtheta1) * diry
      
          let tailtheta2 = (3*p5.PI/4)
          let taildirx2 = p5.cos(tailtheta2) * dirx - p5.sin(tailtheta2) * diry
          let taildiry2 = p5.sin(tailtheta2) * dirx + p5.cos(tailtheta2) * diry
      
          // line 1
          let l1x1 = this.x + dirx * fishWidth
          let l1y1 = this.y + diry * fishWidth
      
          let l1x2 = this.x + perpdirx * fishHeight
          let l1y2 = this.y + perpdiry * fishHeight
      
          let l1_d = this.minimum_distance(l1x1, l1y1, l1x2, l1y2, px, py)
      
          // line 2
          let l2x1 = this.x - dirx * fishWidth
          let l2y1 = this.y - diry * fishWidth
      
          let l2x2 = this.x + perpdirx * fishHeight
          let l2y2 = this.y + perpdiry * fishHeight
      
          let l2_d = this.minimum_distance(l2x1, l2y1, l2x2, l2y2, px, py)
      
          // line 3
          let l3x1 = this.x + dirx * fishWidth
          let l3y1 = this.y + diry * fishWidth
      
          let l3x2 = this.x - perpdirx * fishHeight
          let l3y2 = this.y - perpdiry * fishHeight
      
          let l3_d = this.minimum_distance(l3x1, l3y1, l3x2, l3y2, px, py)
      
          // line 4
          let l4x1 = this.x - dirx * fishWidth
          let l4y1 = this.y - diry * fishWidth
      
          let l4x2 = this.x - perpdirx * fishHeight
          let l4y2 = this.y - perpdiry * fishHeight
      
          let l4_d = this.minimum_distance(l4x1, l4y1, l4x2, l4y2, px, py)
      
          // line 5
          let l5x1 = this.x - dirx * fishWidth
          let l5y1 = this.y - diry * fishWidth
      
          let l5x2 = l5x1 + taildirx1 * tailHeight
          let l5y2 = l5y1 + taildiry1 * tailHeight
      
          let l5_d = this.minimum_distance(l5x1, l5y1, l5x2, l5y2, px, py)
      
          // line 6
          let l6x1 = this.x - dirx * fishWidth
          let l6y1 = this.y - diry * fishWidth
      
          let l6x2 = l6x1 + taildirx2 * tailHeight
          let l6y2 = l6y1 + taildiry2 * tailHeight
      
          let l6_d = this.minimum_distance(l6x1, l6y1, l6x2, l6y2, px, py)
      
          let l7_d = this.minimum_distance(l5x2, l5y2, l6x2, l6y2, px, py)
      
          // return min(l5_d, l6_d)
      
          return p5.min(p5.min(p5.min(p5.min(p5.min(p5.min(l1_d, l2_d), l3_d), l4_d), l5_d), l6_d), l7_d)
          // line 7
      
        }
      
        
      
        update() {
          this.bbox_w = (this.sscale * p.shapeScale * p.bboxScale) * 1442;
          this.bbox_h = (this.sscale * p.shapeScale * p.bboxScale) * 495;
      
          let d = p5.dist(p5.mouseX, p5.mouseY, this.x, this.y);
      
          let diffx = p5.mouseX - this.x;
          let diffy = p5.mouseY - this.y;
          diffx /= d;
          diffy /= d;
      
          let newlocx = p5.mouseX - diffx*(this.bbox_w/2);
          let newlocy = p5.mouseY - diffx*(this.bbox_h/2);
      
          let speed = p.fishSpeed / p5.frameRate()
      
          this.x = (1-speed)*this.x + (speed)*newlocx;
          this.y = (1-speed)*this.y + (speed)*newlocy;
      
          for (let i = 0; i < agents.length; i++) {
            let overlapPerc = this.getOverlap(agents[i]);
            if (overlapPerc>0) {
              let overlapX = this.x - agents[i].getX();
              let overlapY = this.y - agents[i].getY();
              let dist = p5.sqrt(overlapX*overlapX + overlapY*overlapY);
              overlapX /= dist;
              overlapY /= dist;
              this.x += overlapPerc*overlapX;
              this.y += overlapPerc*overlapY;
            }
          }
      
          
      
          this.angle = p5.degrees(p5.atan2(p5.mouseY - this.y, p5.mouseX - this.x));
      
          // calculate distance from mouse to shape and use it to adjust scale
          
          
        }
      
        // draw() {
        //   push();
        //   translate(this.x, this.y);
        //   rotate(radians(this.angle));
        //   noStroke();
        //   noFill();
        //   imageMode(CENTER);
        //   let s = this.sscale * p.shapeScale;
        //   scale(s);
        //   // translate(p.shapeOffset, p.shapeOffset);
          
        // //   image(this.shape, 0, 0);
        //   // fill(100)
        //   // circle(0, 0, 500)
        //   tint('red')
        //   pop();
        // }
      }

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
    
            this.diag = p5.sqrt(dimX*dimX + dimY*dimY)
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
                p5.push()
                p5.stroke(255)
                p5.strokeWeight(1);
                p5.line(this.x - this.dimX/2, this.y, this.x + this.dimX/2, this.y)
                p5.line(this.x, this.y - this.dimY/2, this.x, this.y + this.dimY/2)
                p5.pop()
    
                for (let i = 0; i < this.children.length; i++) {
                    this.children[i].draw();
                }
            }
        }
    
    }
    }

export function Lala() {
    return <ReactP5Wrapper sketch={sketch} />;
}
