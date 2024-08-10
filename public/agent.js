class Agent {
    // agent centre and shape
    x;
    y;
    shape;
  
    // local shape transforms
    sscale = 0.1;
    angle = 0.0;
  
    constructor(x, y, shape, id) {
      this.id = id
      this.x = x;
      this.y = y;
      this.shape = shape;
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
  
      let dx = abs(this.x - agent2.getX());
      let dy = abs(this.y - agent2.getY());
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
        return sqrt(this.length_squared(vx, vy, px, py)); 
      }
  
      let dotres = (px - vx) * (wx - vx) + (py - vy) * (wy - vy)
      let t = max(0, min(1, dotres / l2));
  
      let projx = vx + t * (wx - vx)
      let projy = vy + t * (wy - vy)
      return sqrt(this.length_squared(projx, projy, px, py));
    }
  
    queryDistance(px, py) {
  
      let fishWidth = 40
      let fishHeight = 13
      let tailHeight = 20
  
      let dy = mouseY - this.y
      let dx = mouseX - this.x
      let d = sqrt(dy*dy + dx*dx)
      let dirx = dx / d
      let diry = dy / d
  
      let perpdirx = diry
      let perpdiry = -dirx
  
      let tailtheta1 = (5*PI/4)
      let taildirx1 = cos(tailtheta1) * dirx - sin(tailtheta1) * diry
      let taildiry1 = sin(tailtheta1) * dirx + cos(tailtheta1) * diry
  
      let tailtheta2 = (3*PI/4)
      let taildirx2 = cos(tailtheta2) * dirx - sin(tailtheta2) * diry
      let taildiry2 = sin(tailtheta2) * dirx + cos(tailtheta2) * diry
  
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
  
      return min(min(min(min(min(min(l1_d, l2_d), l3_d), l4_d), l5_d), l6_d), l7_d)
      // line 7
  
    }
  
    
  
    update() {
      this.bbox_w = (this.sscale * p.shapeScale * p.bboxScale) * 1442;
      this.bbox_h = (this.sscale * p.shapeScale * p.bboxScale) * 495;
  
      let d = dist(mouseX, mouseY, this.x, this.y);
  
      let diffx = mouseX - this.x;
      let diffy = mouseY - this.y;
      diffx /= d;
      diffy /= d;
  
      let newlocx = mouseX - diffx*(this.bbox_w/2);
      let newlocy = mouseY - diffx*(this.bbox_h/2);
  
      let speed = p.fishSpeed / frameRate()
  
      this.x = (1-speed)*this.x + (speed)*newlocx;
      this.y = (1-speed)*this.y + (speed)*newlocy;
  
      for (let i = 0; i < agents.length; i++) {
        let overlapPerc = this.getOverlap(agents[i]);
        if (overlapPerc>0) {
          let overlapX = this.x - agents[i].getX();
          let overlapY = this.y - agents[i].getY();
          let dist = sqrt(overlapX*overlapX + overlapY*overlapY);
          overlapX /= dist;
          overlapY /= dist;
          this.x += overlapPerc*overlapX;
          this.y += overlapPerc*overlapY;
        }
      }
  
      
  
      this.angle = degrees(atan2(mouseY - this.y, mouseX - this.x));
  
      // calculate distance from mouse to shape and use it to adjust scale
      
      
    }
  
    draw() {
      push();
      translate(this.x, this.y);
      rotate(radians(this.angle));
      noStroke();
      noFill();
      imageMode(CENTER);
      let s = this.sscale * p.shapeScale;
      scale(s);
      // translate(p.shapeOffset, p.shapeOffset);
      
      image(this.shape, 0, 0);
      // fill(100)
      // circle(0, 0, 500)
      tint('red')
      pop();
    }
  }
  