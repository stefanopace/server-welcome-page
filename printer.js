var canvasElement = document.getElementById('CANVAS');

var height = 33;
var width = 33;
var asciiMin = 33;
var asciiMax = 126;
var cycleCount = 0;
var widthPivot = Math.floor(width / 2);
var heightPivot = Math.floor(height / 2);
var brushChar = ' ';

var canvasContent = new Array(height);
for (var i = 0; i < height; i++) {
    canvasContent[i] = new Array(width);
}
function printCanvas(printFunction) {
    for (var i = 1; i < height-1; i++) {
        for (var j = 1; j < width-1; j++) {
            var nextCharCode = Math.floor(asciiMin + (Math.random() * (asciiMax - asciiMin)));
            var nextChar = '&#' + nextCharCode + ';';
            canvasContent[i][j] = nextChar;
        }
    }
    for (var i = 0; i < height; i++) {
        canvasContent[i][0] = '|';
        canvasContent[i][width-1] = '|';
    }
    for (var i = 0; i < width; i++) {
        canvasContent[0][i] = '-';
        canvasContent[height-1][i] = '-';
    }
    var upCornerChar='.';
    var bottomCornerChar='\'';
    canvasContent[0][0] = upCornerChar;
    canvasContent[0][width-1] = upCornerChar;
    canvasContent[height-1][0] = bottomCornerChar;
    canvasContent[height-1][width-1] = bottomCornerChar;
    

    printFunction();


    canvasString = '';
    for (var i = 0; i < height; i++) {
        for (var j = 0; j < width; j++) {
            canvasString += canvasContent[i][j];
        }
        canvasString += '\n';
    }

    canvasElement.innerHTML = canvasString;
    cycleCount++;
}


function printDiamond() {
    var offset = (cycleCount % Math.min(widthPivot + 1, heightPivot + 1));
    var magicNumber = 31;
    for (var i = 1; i < height-1; i++) {
        for (var j = 1; j < width-1; j++) {
            if ((i >= heightPivot - cycleCount % magicNumber && i <= heightPivot + cycleCount % magicNumber) && (j >= widthPivot - cycleCount % magicNumber && j <= widthPivot + cycleCount % magicNumber)) {
                if ((i - heightPivot) + (j - widthPivot) === cycleCount % magicNumber) {
                    canvasContent[i][j] = brushChar;
                }
                if ((i - heightPivot) - (j - widthPivot) === cycleCount % magicNumber) {
                    canvasContent[i][j] = brushChar;
                }
                if ((j - widthPivot) - (i - heightPivot) === cycleCount % magicNumber) {
                    canvasContent[i][j] = brushChar;
                }
                if ((i - heightPivot) + (j - widthPivot) === -(cycleCount % magicNumber)) {
                    canvasContent[i][j] = brushChar;
                }
            }
        }
    }
}
function printCircle() {
    var radius = cycleCount % Math.floor(Math.sqrt(Math.pow(width / 2, 2) + Math.pow(height / 2, 2)));
    for (var t = 0; t < 2 * Math.PI; t = t + 0.01) {
        var i = heightPivot + Math.floor(radius * Math.sin(t));
        var j = widthPivot + Math.floor(radius * Math.cos(t));
        if (i >= 1 && i < height-1 && j >= 1 && j < width-1) {
            canvasContent[i][j] = brushChar;
        }
    }
}

function printSpiral() {
    var n = 20;
    var b = 1.1;
    var a = -(cycleCount / 10) % 2 * Math.PI;
    for (var t = 0; t < n; t = t + 0.01) {
        var i = heightPivot + Math.floor(b * t * Math.sin(t + a));
        var j = widthPivot + Math.floor(b * t * Math.cos(t + a));
        if (i >= 1 && i < height-1 && j >= 1 && j < width-1) {
            canvasContent[i][j] = brushChar;
        }
    }
}

setInterval(printCanvas, 50, printSpiral); 