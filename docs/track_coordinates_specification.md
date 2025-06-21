# Track Coordinates Specification

## Exact Track Space Positions for Implementation

### Board Dimensions Reference
- **Board Total**: 800px × 640px (with 16px purple border)
- **Island Area**: 464px × 480px (positioned at top: 80px, left: 168px)
- **Usable Track Area**: ~440px × 460px (with 12px margin from island edges)

---

## Complete Track Space Coordinates (1-50)

### **Segment 1: Start Area & Bottom Edge (Spaces 1-12)**
```javascript
// Bottom-left starting area, moving right along bottom edge
{ space: 1, x: 180, y: 420, type: 'start', description: 'Start - Coconut Beach' },
{ space: 2, x: 210, y: 415, type: 'normal', description: 'Beach path' },
{ space: 3, x: 240, y: 410, type: 'normal', description: 'Shoreline' },
{ space: 4, x: 270, y: 405, type: 'normal', description: 'Palm grove entry' },
{ space: 5, x: 300, y: 400, type: 'normal', description: 'First palm tree' },
{ space: 6, x: 330, y: 395, type: 'normal', description: 'Coconut cluster' },
{ space: 7, x: 360, y: 390, type: 'normal', description: 'Sandy path' },
{ space: 8, x: 390, y: 385, type: 'normal', description: 'Tropical trail' },
{ space: 9, x: 420, y: 380, type: 'normal', description: 'Island interior' },
{ space: 10, x: 450, y: 375, type: 'normal', description: 'Dense vegetation' },
{ space: 11, x: 480, y: 370, type: 'normal', description: 'Winding path' },
{ space: 12, x: 510, y: 365, type: 'normal', description: 'Right edge approach' },
```

### **Segment 2: Right Edge Ascent (Spaces 13-24)**
```javascript
// Moving up the right side of the island
{ space: 13, x: 540, y: 350, type: 'normal', description: 'Right shore start' },
{ space: 14, x: 555, y: 330, type: 'normal', description: 'Coastal climb' },
{ space: 15, x: 570, y: 310, type: 'normal', description: 'Rocky outcrop' },
{ space: 16, x: 585, y: 290, type: 'normal', description: 'Steep ascent' },
{ space: 17, x: 600, y: 270, type: 'normal', description: 'Cliff edge' },
{ space: 18, x: 590, y: 250, type: 'normal', description: 'Mountain path' },
{ space: 19, x: 580, y: 230, type: 'normal', description: 'High altitude' },
{ space: 20, x: 570, y: 210, type: 'normal', description: 'Peak approach' },
{ space: 21, x: 560, y: 190, type: 'normal', description: 'Summit trail' },
{ space: 22, x: 550, y: 170, type: 'normal', description: 'Mountain top' },
{ space: 23, x: 530, y: 155, type: 'normal', description: 'Peak plateau' },
{ space: 24, x: 510, y: 140, type: 'normal', description: 'Top ridge' },
```

### **Segment 3: Top Edge Traverse (Spaces 25-36)**
```javascript
// Moving across the top of the island, left direction
{ space: 25, x: 490, y: 125, type: 'normal', description: 'High traverse start' },
{ space: 26, x: 470, y: 115, type: 'normal', description: 'Ridge walk' },
{ space: 27, x: 450, y: 110, type: 'normal', description: 'Scenic overlook' },
{ space: 28, x: 430, y: 105, type: 'normal', description: 'Cloud level' },
{ space: 29, x: 410, y: 100, type: 'normal', description: 'Misty heights' },
{ space: 30, x: 390, y: 105, type: 'normal', description: 'Weather station' },
{ space: 31, x: 370, y: 110, type: 'normal', description: 'Observatory point' },
{ space: 32, x: 350, y: 115, type: 'normal', description: 'Signal tower' },
{ space: 33, x: 330, y: 120, type: 'normal', description: 'Communication hub' },
{ space: 34, x: 310, y: 125, type: 'normal', description: 'Antenna array' },
{ space: 35, x: 290, y: 130, type: 'normal', description: 'Tech facility' },
{ space: 36, x: 270, y: 135, type: 'normal', description: 'Research station' },
```

### **Segment 4: Left Edge Descent (Spaces 37-48)**
```javascript
// Moving down the left side of the island
{ space: 37, x: 250, y: 150, type: 'normal', description: 'Left descent start' },
{ space: 38, x: 235, y: 170, type: 'normal', description: 'Steep decline' },
{ space: 39, x: 220, y: 190, type: 'normal', description: 'Switchback trail' },
{ space: 40, x: 205, y: 210, type: 'normal', description: 'Forest entry' },
{ space: 41, x: 190, y: 230, type: 'normal', description: 'Dense jungle' },
{ space: 42, x: 200, y: 250, type: 'normal', description: 'Canopy level' },
{ space: 43, x: 210, y: 270, type: 'normal', description: 'Tree bridge' },
{ space: 44, x: 220, y: 290, type: 'normal', description: 'Vine crossing' },
{ space: 45, x: 230, y: 310, type: 'normal', description: 'Monkey territory' },
{ space: 46, x: 240, y: 330, type: 'normal', description: 'Fruit grove' },
{ space: 47, x: 250, y: 350, type: 'normal', description: 'Banana plantation' },
{ space: 48, x: 260, y: 370, type: 'normal', description: 'Final approach' },
```

### **Segment 5: Center Spiral to Paradise (Spaces 49-50)**
```javascript
// Final spiral into the center paradise area
{ space: 49, x: 280, y: 350, type: 'normal', description: 'Paradise gate' },
{ space: 50, x: 300, y: 330, type: 'finish', description: 'PARADISE - Winner!' },
```

---

## SVG Path Generation

### **Complete Path String**
```javascript
const TRACK_PATH_DATA = `
M180,420 
L210,415 L240,410 L270,405 L300,400 L330,395 L360,390 L390,385 L420,380 L450,375 L480,370 L510,365
L540,350 L555,330 L570,310 L585,290 L600,270 L590,250 L580,230 L570,210 L560,190 L550,170 L530,155 L510,140
L490,125 L470,115 L450,110 L430,105 L410,100 L390,105 L370,110 L350,115 L330,120 L310,125 L290,130 L270,135
L250,150 L235,170 L220,190 L205,210 L190,230 L200,250 L210,270 L220,290 L230,310 L240,330 L250,350 L260,370
L280,350 L300,330
`;
```

### **Smooth Curved Path (Alternative)**
```javascript
const TRACK_PATH_CURVED = `
M180,420 
Q210,415 240,410 Q270,405 300,400 Q330,395 360,390 Q390,385 420,380 Q450,375 480,370 Q510,365 540,350
Q555,330 570,310 Q585,290 600,270 Q590,250 580,230 Q570,210 560,190 Q550,170 530,155 Q510,140 490,125
Q470,115 450,110 Q430,105 410,100 Q390,105 370,110 Q350,115 330,120 Q310,125 290,130 Q270,135 250,150
Q235,170 220,190 Q205,210 190,230 Q200,250 210,270 Q220,290 230,310 Q240,330 250,350 Q260,370 280,350
Q300,330 300,330
`;
```

---

## Visual Styling Specifications

### **Track Space Visual Hierarchy**

#### **Start Space (Space 1)**
```css
.track-space.start-space {
    width: 28px;
    height: 28px;
    background: radial-gradient(circle, #FFD600 0%, #FFC107 50%, #FF8F00 100%);
    border: 3px solid var(--royal-purple);
    box-shadow: 0 0 8px rgba(255, 214, 0, 0.6), 0 3px 6px rgba(0,0,0,0.4);
    font-weight: bold;
    font-size: 10px;
}

.track-space.start-space::before {
    content: "🏁";
    position: absolute;
    top: -15px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 12px;
}
```

#### **Normal Spaces (Spaces 2-49)**
```css
.track-space.normal-space {
    width: 24px;
    height: 24px;
    background: radial-gradient(circle, #FFFFFF 0%, #F5F5F5 70%, #E0E0E0 100%);
    border: 2px solid var(--black);
    box-shadow: 0 2px 4px rgba(0,0,0,0.3);
    font-size: 8px;
    transition: all 0.2s ease;
}

.track-space.normal-space:hover {
    transform: scale(1.15);
    box-shadow: 0 3px 8px rgba(0,0,0,0.4);
    background: radial-gradient(circle, #FFFFFF 0%, #E3F2FD 70%, #BBDEFB 100%);
}
```

#### **Finish Space (Space 50)**
```css
.track-space.finish-space {
    width: 32px;
    height: 32px;
    background: radial-gradient(circle, #FF6B24 0%, #FF5722 50%, #D84315 100%);
    border: 4px solid var(--royal-purple);
    box-shadow: 0 0 12px rgba(255, 107, 36, 0.8), 0 4px 8px rgba(0,0,0,0.5);
    font-weight: bold;
    font-size: 11px;
    color: white;
    text-shadow: 1px 1px 2px rgba(0,0,0,0.8);
}

.track-space.finish-space::before {
    content: "🏆";
    position: absolute;
    top: -20px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 16px;
    animation: trophy-glow 2s ease-in-out infinite alternate;
}

@keyframes trophy-glow {
    0% { filter: drop-shadow(0 0 3px gold); }
    100% { filter: drop-shadow(0 0 8px gold); }
}
```

### **Player Pawn Specifications**

#### **Human Player Pawn**
```css
.player-pawn.human-pawn {
    width: 18px;
    height: 18px;
    background: radial-gradient(circle, #2196F3 0%, #1976D2 50%, #0D47A1 100%);
    border: 2px solid #FFFFFF;
    box-shadow: 0 0 4px rgba(33, 150, 243, 0.6), 0 2px 4px rgba(0,0,0,0.4);
    font-size: 10px;
    font-weight: bold;
    color: white;
    text-shadow: 1px 1px 1px rgba(0,0,0,0.8);
    z-index: 20;
}
```

#### **AI Player Pawn**
```css
.player-pawn.ai-pawn {
    width: 18px;
    height: 18px;
    background: radial-gradient(circle, #F44336 0%, #D32F2F 50%, #B71C1C 100%);
    border: 2px solid #FFFFFF;
    box-shadow: 0 0 4px rgba(244, 67, 54, 0.6), 0 2px 4px rgba(0,0,0,0.4);
    font-size: 10px;
    font-weight: bold;
    color: white;
    text-shadow: 1px 1px 1px rgba(0,0,0,0.8);
    z-index: 20;
}
```

### **Multiple Players on Same Space**
```css
.track-space.occupied-multiple .player-pawn:nth-child(2) {
    top: -12px;
    left: 8px;
    z-index: 21;
}

.track-space.occupied-multiple .player-pawn:nth-child(3) {
    top: -4px;
    left: -8px;
    z-index: 22;
}
```

---

## Animation Specifications

### **Player Movement Animation**
```css
@keyframes player-move {
    0% { 
        transform: scale(1) rotate(0deg);
        box-shadow: 0 0 4px rgba(33, 150, 243, 0.6);
    }
    50% { 
        transform: scale(1.2) rotate(180deg);
        box-shadow: 0 0 8px rgba(33, 150, 243, 0.8);
    }
    100% { 
        transform: scale(1) rotate(360deg);
        box-shadow: 0 0 4px rgba(33, 150, 243, 0.6);
    }
}

.player-pawn.moving {
    animation: player-move 0.5s ease-in-out;
}
```

### **Track Path Animation**
```css
.track-path {
    stroke: rgba(255, 255, 255, 0.7);
    stroke-width: 4px;
    stroke-linecap: round;
    stroke-linejoin: round;
    fill: none;
    filter: drop-shadow(0 0 3px rgba(255, 255, 255, 0.5));
}

.track-path.animated {
    stroke-dasharray: 10, 5;
    animation: path-flow 3s linear infinite;
}

@keyframes path-flow {
    0% { stroke-dashoffset: 0; }
    100% { stroke-dashoffset: 30; }
}
```

---

## Implementation Validation

### **Visual Checkpoints**
1. **Space Distribution**: Verify even spacing along path curves
2. **Number Visibility**: Ensure all space numbers are readable
3. **Path Continuity**: Confirm smooth visual flow between spaces
4. **Player Visibility**: Check pawn visibility on all space types
5. **Responsive Scaling**: Test appearance at different zoom levels

### **Functional Checkpoints**
1. **Click Detection**: Verify all spaces respond to click events
2. **Position Tracking**: Confirm accurate space-to-coordinate mapping
3. **Movement Logic**: Test player advancement through spaces
4. **Boundary Handling**: Verify behavior at spaces 1 and 50
5. **Multi-player Support**: Test multiple pawns on same space

This specification provides exact coordinates and styling for implementing the complete track system that matches the original Bubblegum Stuff Death by Coconuts board game experience.
