const canvasKita = document.getElementById('canvas');
canvasKita.width = 700;
canvasKita.height = 400;
// canvasKita.width = scroll.width;
// canvasKita.height = scroll.height;
const ctx = canvasKita.getContext('2d');

const imageData = ctx.getImageData(0, 0, canvasKita.width, canvasKita.height);


// Fungsi pembuatan titik
function gambarTitik(imageDataTemp, x, y, r, g, b) {
    let index;
    index = 4 * (x + (y * canvasKita.width));
    imageDataTemp.data[index + 0] = r;	// R
    imageDataTemp.data[index + 1] = g;	// G
    imageDataTemp.data[index + 2] = b;	// B
    imageDataTemp.data[index + 3] = 255;	// A
}

function dda(imageData, x1, y1, x2, y2, r, g, b) {
    let dx = x2 - x1; // Bisa positif atau negatif
    let dy = y2 - y1; // Bisa positif atau negatif

    if (Math.abs(dx) > Math.abs(dy)) {
        // Penambahan pada sumbu x
        let y = y1;
        if (x2 > x1) {
            // Bergerak ke kanan
            for (let x = x1; x < x2; x++) {
                y = y + dy / Math.abs(dx); // 1/m
                gambarTitik(imageData, x, y, r, g, b);
            }
        } else {
            // Bergerak ke kiri
            for (let x = x1; x > x2; x--) {
                y = y + dy / Math.abs(dx); // 1/m
                gambarTitik(imageData, x, y, r, g, b);
            }
        }
    } else {
        // Penambahan pada sumbu y
        let x = x1;
        if (y2 > y1) {
            // Bergerak ke kanan
            for (let y = y1; y < y2; y++) {
                x = x + dx / Math.abs(dy); // m
                gambarTitik(imageData, x, y, r, g, b);
            }
        }

        else {
            // Bergerak ke kiri
            for (let y = y1; y > y2; y--) {
                x = x + dx / Math.abs(dy); // m
                gambarTitik(imageData, x, y, r, g, b);
            }
        }
    }
}

/* Algoritma floodFill */
function floodFill(imageDataTemp, canvas, x0, y0, toFlood, color) {
    let tumpukan = [];
    tumpukan.push({ x: x0, y: y0 });
    while (tumpukan.length > 0) {
        var titikSkrg = tumpukan.shift();
        var indexSkrg = 4 * (titikSkrg.x + titikSkrg.y * canvas.width);
        var r1 = imageDataTemp.data[indexSkrg + 0];
        var g1 = imageDataTemp.data[indexSkrg + 1];
        var b1 = imageDataTemp.data[indexSkrg + 2];
        if ((r1 == toFlood.r) && (g1 == toFlood.g) && (b1 == toFlood.b)) {
            imageDataTemp.data[indexSkrg + 0] = color.r;
            imageDataTemp.data[indexSkrg + 1] = color.g;
            imageDataTemp.data[indexSkrg + 2] = color.b;
            imageDataTemp.data[indexSkrg + 3] = 255;

            tumpukan.push({ x: titikSkrg.x + 1, y: titikSkrg.y });
            tumpukan.push({ x: titikSkrg.x - 1, y: titikSkrg.y });
            tumpukan.push({ x: titikSkrg.x, y: titikSkrg.y + 1 });
            tumpukan.push({ x: titikSkrg.x, y: titikSkrg.y - 1 });
        }
    }
}

function polygon(imageDataTemp, point_array, r, g, b) {
    let point = point_array[0];
    for (let i = 1; i < point_array.length; i++) {
        let point2 = point_array[i];
        dda(imageDataTemp, point.x, point.y, point2.x, point2.y, r, g, b);
        point = point2;
    }
    dda(imageDataTemp, point.x, point.y, point_array[0].x, point_array[0].y, r, g, b);
}

// paktani?

ctx.fillStyle="	#808080";
ctx.fillRect(140,45,320,260);

// kepala
ctx.beginPath();
ctx.arc(300,200,100,0,Math.PI*2);
ctx.fillStyle="	#FFFF00";
ctx.fill();
// ctx.stroke();
ctx.lineWidth=7;
// mata
ctx.beginPath();
ctx.arc(270,180,10,0,Math.PI*2);
ctx.stroke();
ctx.beginPath();
ctx.arc(330,180,10,0,Math.PI*2);
ctx.stroke();
// mulut
ctx.beginPath();
ctx.arc(300,210,50,0,Math.PI*1);
ctx.lineWidth=5;
ctx.stroke();

ctx.beginPath();
ctx.moveTo(295,210);
ctx.lineTo(300,200);
ctx.lineTo(305,210);
ctx.lineWidth=4;
ctx.stroke();



ctx.beginPath();
ctx.arc(300,200,100,0,Math.PI*2);
ctx.stroke();


ctx.beginPath();
ctx.moveTo(150,160);
ctx.lineTo(450,160);
ctx.lineTo(300,50);
ctx.closePath();
ctx.fillStyle="#800000";
ctx.fill();

ctx.beginPath();
ctx.moveTo(150,160);
ctx.lineTo(450,160);
ctx.lineTo(300,50);
ctx.closePath();
ctx.stroke();


ctx.strokeRect(140,45,320,260);

