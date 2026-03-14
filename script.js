// TEST İÇİN YIL DÖNÜMÜ TARİHİNİ AYARLA
const realDate = "2025-03-15"; 

function checkAnniversary() {
    const inputDate = document.getElementById("anniversary-date").value;
    if (inputDate === realDate) {
        document.getElementById("login-screen").classList.add("hidden");
        document.getElementById("question-1").classList.remove("hidden");
    } else {
        document.getElementById("login-error").classList.remove("hidden");
    }
}

function openEnvelope() {
    document.getElementById("envelope-heart").classList.add("hide");
    document.getElementById("envelope-top").classList.add("open");
    document.getElementById("letter").classList.add("open");
    setTimeout(() => { document.getElementById("envelope").classList.add("envelope-down"); }, 1000); 
}

// --- ANA CEVAP KONTROL SİSTEMİ ---
function checkAnswer(currentQuestionNum, expectedAnswer) {
    const inputAnswer = document.getElementById("answer-" + currentQuestionNum).value.toLowerCase().trim();
    
    if (inputAnswer === expectedAnswer.toLowerCase().trim()) {
        
        if (currentQuestionNum === 1) {
            document.getElementById("question-1").classList.add("hidden");
            document.getElementById("glitch-screen").classList.remove("hidden"); 
            setTimeout(() => {
                document.getElementById("glitch-screen").classList.add("hidden");
                document.getElementById("question-2").classList.remove("hidden");
                startHackerMode();
            }, 3000); 
        } 
        else if (currentQuestionNum === 2) {
            stopHackerMode(); 
            document.getElementById("question-2").classList.add("hidden");
            document.getElementById("hacker-success-screen").classList.remove("hidden");
            setTimeout(() => { $(".hacker-success-text").animate({ width: "100%" }, 2000); }, 500);
            setTimeout(() => {
                document.getElementById("hacker-success-screen").classList.add("hidden");
                document.getElementById("question-3").classList.remove("hidden");
                startRomanticMode();
            }, 4500);
        }
        else if (currentQuestionNum === 3) {
            document.getElementById("question-3").classList.add("hidden");
            stopRomanticMode(); 
            document.getElementById("question-4").classList.remove("hidden");
            initializeCatFeeding(); 
        }
        else if (currentQuestionNum === 4) {
            document.getElementById("question-4").classList.add("hidden");
            document.getElementById("question-5").classList.remove("hidden");
            startStardewMode(); 
        }
        else if (currentQuestionNum === 6) {
            document.getElementById("question-6").classList.add("hidden");
            document.body.classList.remove("detective-mode");
            document.getElementById("question-7").classList.remove("hidden");
            initMakeupGame();
        }
        else if (currentQuestionNum === 7) {
            document.getElementById("question-7").classList.add("hidden");
            document.body.classList.remove("makeup-mode");
            document.getElementById("question-8").classList.remove("hidden");
            initDessertGame();
        }
        else if (currentQuestionNum === 8) {
            document.getElementById("question-8").classList.add("hidden");
            document.body.classList.remove("dessert-mode");
            document.getElementById("question-9").classList.remove("hidden");
            document.body.classList.add("peony-mode");
        }
        else if (currentQuestionNum === 9) {
            document.getElementById("question-9").classList.add("hidden");
            document.body.classList.remove("peony-mode");
            document.getElementById("question-10").classList.remove("hidden");
            document.body.classList.add("sure-mode");
        }
        
    } else {
        alert("Yanlış cevap! Bir daha düşün bakalım :)");
        document.getElementById("answer-" + currentQuestionNum).value = "";
    }
}

// ================== HACKER MODU ==================
var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
const secretPassword = "seniseviyorum"; 
let matrixAnimationInterval = null; 
let timerInterval = null;

class Random { 
    static generateBinary() { return Math.random() > 0.5 ? 1 : 0; } 
    static generate(min, max) { return Math.floor((Math.random() * max) + min); } 
}

class Binary { 
    constructor(isSecret = false) { 
        this.isSecret = isSecret; 
        this.value = isSecret ? secretPassword : Random.generateBinary(); 
    } 
    animate(ts, leftOffset, topOffset) { 
        var div = document.createElement("div"); 
        let fontSize = this.isSecret ? 35 : ts; 
        $(div).css({"font-size": fontSize + "px", "top": topOffset * (ts / 2), "left": leftOffset + "px"}).text(this.value).addClass("binary").hide(); 
        if (this.isSecret) $(div).addClass("secret-code"); 
        $("#matrix-container").append(div); 
        $(div).show().addClass("animated fadeIn").on(animationEnd, (e) => this.fadeInEnd(e, this.isSecret)); 
        return $(div).offset().top; 
    } 
    fadeInEnd(event, isSecret) { 
        var $binary = $(event.currentTarget); 
        $binary.removeClass("animated fadeIn"); 
        let delay = isSecret ? 2500 : 0; 
        setTimeout(() => { $binary.addClass("animated fadeOut").on(animationEnd, function() { $binary.remove(); }); }, delay); 
    } 
}

class BinaryLine { 
    constructor(lO, tS, dS, showSecret = false) { 
        this.leftOffset = lO; this.textSize = tS; this.documentSize = dS; this.showSecret = showSecret; 
    } 
    generate() { 
        var iterator = 1, currentOffset = 0, isSecretShown = false; 
        var interval = setInterval(() => { 
            if (currentOffset < this.documentSize) { 
                let isSecret = this.showSecret && !isSecretShown && Math.random() > 0.6; 
                var binary = new Binary(isSecret); 
                currentOffset = binary.animate(this.textSize, this.leftOffset, iterator); 
                iterator++; 
                if (isSecret) { isSecretShown = true; clearInterval(interval); } 
            } else { clearInterval(interval); } 
        }, 80); 
    } 
}

function startHackerMode() { 
    document.body.classList.add("hacker-mode"); 
    matrixAnimationInterval = setInterval(function() { 
        new BinaryLine(Random.generate(0, $(document).width()), Random.generate($(document).width() * 0.008, $(document).width() * 0.015), $(document).height()).generate(); 
    }, 400); 
    let timeToSecret = 40; 
    timerInterval = setInterval(() => { 
        timeToSecret--; 
        if(timeToSecret <= 0) { 
            new BinaryLine(Random.generate($(document).width() * 0.2, $(document).width() * 0.8), 20, $(document).height(), true).generate(); 
            timeToSecret = 40; 
        } 
    }, 1000); 
}

function stopHackerMode() { 
    clearInterval(matrixAnimationInterval); 
    clearInterval(timerInterval); 
    $("#matrix-container").empty(); 
    document.body.classList.remove("hacker-mode"); 
}

// ================== ROMANTİK MOD ==================
let ribbonClicks = 0; 
const maxClicks = 10; 
let canvasAnimationId;

function startRomanticMode() { 
    document.body.classList.add("romantic-mode"); 
    initCanvasAnimation(); 
}

function stopRomanticMode() { 
    cancelAnimationFrame(canvasAnimationId); 
    document.body.classList.remove("romantic-mode"); 
}

function growRibbon() { 
    ribbonClicks++; 
    const ribbon = document.getElementById("pink-ribbon"); 
    let newWidth = 100 + (ribbonClicks * 20); 
    ribbon.style.width = newWidth + "px"; 
    
    if (ribbonClicks >= maxClicks) { 
        ribbon.style.opacity = "0"; 
        setTimeout(() => { document.getElementById("ribbon-container").style.display = "none"; }, 500); 
        setTimeout(() => { 
            document.getElementById("rose-question-box").classList.remove("hidden"); 
            setTimeout(() => { document.getElementById("rose-question-box").classList.add("drop-down"); }, 50); 
        }, 600); 
    } 
}

function initCanvasAnimation() { 
    var canvas = document.getElementById('pink-canvas'), c = canvas.getContext('2d'), w, h, twoPI = Math.PI * 2, mX, mY; 
    function resizeCanvas() { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; } 
    resizeCanvas(); 
    window.addEventListener('resize', resizeCanvas); 
    canvas.addEventListener('mousemove', function(e){ mX = e.pageX; mY = e.pageY; }); 
    c.globalCompositeOperation = "lighter"; 
    var points = [], gravity = 0.005; 
    
    function Point(){ 
        var point = { x: Math.random() * w, y: h+90, scale: 1, direction: Math.random() * twoPI, speed: Math.random() * 2, scale: (Math.random() * 40) + 10 }; 
        point.xd = Math.cos(point.direction) * point.speed; 
        point.yd = Math.sin(point.direction) * point.speed; 
        return point; 
    } 
    
    function update(){ 
        for(var p = 0; p < points.length; p++){ 
            var xd = points[p].x - mX, yd = points[p].y - mY, dd = Math.sqrt(xd * xd + yd * yd), da = Math.atan2(yd, xd); 
            if(dd < 100 && mX !== undefined){ 
                points[p].xd -= Math.cos(da)/10; points[p].yd -= Math.sin(da)/10; 
            } else { points[p].yd -= gravity; } 
            points[p].x += points[p].xd; points[p].y += points[p].yd; 
            
            if(points[p].x > w+100 || points[p].x < -100 || points[p].y > h+100 || points[p].y < -100){ 
                points[p] = new Point(); 
            } 
        } 
    } 
    
    function draw(){ 
        for(var p = 0; p < points.length; p++){ 
            var x = points[p].x, y = points[p].y, s = points[p].scale; 
            c.save(); c.beginPath(); 
            c.moveTo(x+0.23*s,y+0.14*s); c.lineTo(x+0.34*s,y-0.05*s); 
            c.bezierCurveTo(x+0.34*s,y-0.05*s,x+0.50*s,y-0.39*s,x+0.37*s,y-0.65*s); 
            c.bezierCurveTo(x+0.24*s,y-0.92*s,x+0.22*s,y-0.98*s,x+0.22*s,y-0.98*s); 
            c.bezierCurveTo(x+0.22*s,y-0.98*s,x+0.16*s,y-1.09*s,x+0.00*s,y-1.08*s); 
            c.bezierCurveTo(x+-0.15*s,y-1.07*s,x+-0.18*s,y-0.96*s,x+-0.18*s,y-0.96*s); 
            c.bezierCurveTo(x+-0.18*s,y-0.96*s,x+-0.19*s,y-0.94*s,x+-0.32*s,y-0.64*s); 
            c.bezierCurveTo(x+-0.44*s,y-0.35*s,x+-0.30*s,y-0.02*s,x+-0.30*s,y-0.02*s); 
            c.lineTo(x+-0.22*s,y+0.12*s); c.lineTo(x+-0.54*s,y+0.90*s); 
            c.lineTo(x+-0.40*s,y+1.29*s); c.lineTo(x+-0.01*s,y+0.57*s); 
            c.lineTo(x+0.25*s,y+1.09*s); c.lineTo(x+0.71*s,y+1.13*s); 
            c.lineTo(x+0.23*s,y+0.14*s); c.closePath(); 
            c.moveTo(x+0.12*s,y-0.52*s); 
            c.bezierCurveTo(x+0.05*s,y-0.39*s,x+0.00*s,y-0.30*s,x+0.00*s,y-0.30*s); 
            c.bezierCurveTo(x+0.00*s,y-0.30*s,x+-0.06*s,y-0.39*s,x+-0.11*s,y-0.50*s); 
            c.bezierCurveTo(x+-0.16*s,y-0.61*s,x+-0.19*s,y-0.75*s,x+-0.19*s,y-0.75*s); 
            c.bezierCurveTo(x+-0.19*s,y-0.75*s,x+-0.13*s,y-0.83*s,x+0.00*s,y-0.84*s); 
            c.bezierCurveTo(x+0.13*s,y-0.85*s,x+0.23*s,y-0.78*s,x+0.23*s,y-0.78*s); 
            c.bezierCurveTo(x+0.23*s,y-0.78*s,x+0.19*s,y-0.65*s,x+0.12*s,y-0.52*s); 
            c.closePath(); 
            c.fillStyle = "rgba(234,128,176,0.75)"; 
            c.fill(); c.restore(); 
        } 
    } 
    
    function clear(){ 
        c.save(); c.globalCompositeOperation = "source-over"; 
        c.fillStyle = "rgba(34,34,34,1)"; 
        c.fillRect(0,0,w,h); c.restore(); 
    } 
    function animate(){ 
        update(); clear(); draw(); 
        canvasAnimationId = requestAnimationFrame(animate); 
    } 
    
    for(var i = 0; i < 50; i++){ points.push( new Point() ); } 
    animate(); 
}

// ================== KEDİ MODU ==================
let eatenFoods = 0;

function initializeCatFeeding() { 
    const foodSource = document.getElementById('cat-food'); 
    const droppedFoods = document.getElementById('cat-dropped-foods'); 
    const plate = document.getElementById('cat-plate'); 
    const catLabel = document.getElementById('cat-dropzone'); 
    
    foodSource.addEventListener('dragstart', function(e) { 
        e.dataTransfer.setData('catFood', 'true'); 
        e.target.style.cursor = 'grabbing'; 
    }); 
    
    foodSource.addEventListener('dragend', function(e) { 
        e.target.style.cursor = 'grab'; 
    }); 
    
    catLabel.addEventListener('dragover', function(e) { 
        e.preventDefault(); 
    }); 
    
    catLabel.addEventListener('drop', function(e) { 
        e.preventDefault(); 
        const isCatFood = e.dataTransfer.getData('catFood'); 
        if (isCatFood === 'true' && eatenFoods < 3) { 
            eatenFoods++; 
            const food = document.createElement('div'); 
            food.className = 'dropped-food'; 
            droppedFoods.appendChild(food); 
            plate.innerHTML = `Teşekkür ederimmm canım annemmm`; 
            
            if (eatenFoods === 3) { 
                foodSource.setAttribute('draggable', 'false'); 
                foodSource.style.opacity = '0.5'; 
                plate.innerHTML = "BENİİ SEV LÜTFENNN!"; 
                catLabel.addEventListener('click', petCatAfterFeeding); 
                catLabel.style.cursor = 'pointer'; 
            } 
        } 
    }); 
}

function petCatAfterFeeding() { 
    document.getElementById('cat-question-box').classList.remove("hidden"); 
    const catLabel = document.getElementById('cat-dropzone'); 
    catLabel.removeEventListener('click', petCatAfterFeeding); 
    catLabel.style.cursor = 'default'; 
}

// ================== STARDEW VALLEY ==================
function startStardewMode() { 
    document.body.classList.add("stardew-mode"); 
    const wrapper = document.getElementById('soru5-wrapper'); 
    const char1 = document.getElementById('soru5-char1'); 
    const char2 = document.getElementById('soru5-char2'); 
    
    setTimeout(() => { 
        char1.style.left = 'calc(50% - 60px)'; 
        char2.style.right = 'calc(50% - 60px)'; 
        
        setTimeout(() => { 
            char1.style.transform = 'translateX(20px) rotate(10deg)'; 
            char2.style.transform = 'scaleX(-1) translateX(20px) rotate(10deg)'; 
            soru5KalpYagmuruBaslat(wrapper, 3000); 
        }, 2000); 
    }, 500); 
}

function soru5KalpYagmuruBaslat(wrapper, sure) { 
    let delay = 400; 
    let startTime = Date.now(); 
    
    function spawnHeart() { 
        const heart = document.createElement('div'); 
        heart.innerText = '❤️'; 
        heart.className = 'soru5-kucuk-kalp'; 
        heart.style.left = Math.random() * 90 + '%'; 
        heart.style.top = Math.random() * 80 + '%'; 
        wrapper.appendChild(heart); 
        
        setTimeout(() => heart.remove(), 2000); 
        
        let elapsedTime = Date.now() - startTime; 
        if (elapsedTime < sure) { 
            delay = Math.max(30, delay - 25); 
            setTimeout(spawnHeart, delay); 
        } else { 
            document.getElementById('soru5-dev-kalp').classList.add('soru5-kalp-buyu'); 
            setTimeout(() => { 
                document.getElementById('soru5-kutu').classList.add('soru5-kutu-goster'); 
            }, 1500); 
        } 
    } 
    spawnHeart(); 
}

function kacirButon(btn) { 
    const x = Math.random() * 150 - 75; 
    const y = Math.random() * 100 - 50; 
    btn.style.transform = `translate(${x}px, ${y}px)`; 
}

function goToQuestion6() { 
    document.body.classList.remove("stardew-mode"); 
    document.getElementById("question-5").classList.add("hidden"); 
    document.getElementById("question-6").classList.remove("hidden"); 
    document.body.classList.add("detective-mode"); 
}

// ================== DEDEKTİF ==================
function checkKiller(suspect) { 
    if (suspect === 'Abdullah') { 
        document.getElementById('detective-case').classList.add('hidden'); 
        document.getElementById('detective-success').classList.remove('hidden'); 
        setTimeout(() => { 
            document.getElementById('detective-real-question').classList.remove('hidden'); 
        }, 3000); 
    } else { 
        const err = document.getElementById('killer-error'); 
        err.classList.remove('hidden'); 
        setTimeout(() => { err.classList.add('hidden'); }, 3000); 
    } 
}

// ================== 7. MAKYAJ OYUNU ==================
let makeupApplied = 0;
function initMakeupGame() {
    document.body.classList.add("makeup-mode");
    const face = document.getElementById('deniz-face-drop');
    const tools = document.querySelectorAll('.m-tool');
    
    tools.forEach(tool => {
        tool.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('makeupTool', e.target.id);
        });
    });

    face.addEventListener('dragover', e => e.preventDefault());
    face.addEventListener('drop', e => {
        e.preventDefault();
        const toolId = e.dataTransfer.getData('makeupTool');
        if (!toolId) return; // Kedi maması vs karıştırmaması için

        const toolElement = document.getElementById(toolId);
        if (toolElement && !toolElement.classList.contains('used')) {
            toolElement.classList.add('used');
            toolElement.style.opacity = '0.3';
            toolElement.setAttribute('draggable', 'false');
            makeupApplied++;
            
            const fx = document.createElement('div');
            fx.className = 'makeup-fx';
            fx.innerText = toolId === 'tool-ruj' ? '💋' : (toolId === 'tool-allik' ? '🌸' : '✨');
            fx.style.left = Math.random() * 40 + 30 + '%';
            fx.style.top = Math.random() * 40 + 30 + '%';
            face.appendChild(fx);

            if (makeupApplied === 3) {
                setTimeout(() => {
                    document.getElementById('makeup-question').classList.remove('hidden');
                }, 800);
            }
        }
    });
}

// ================== 8. TATLI YAPMA OYUNU ==================
let dessertIngredients = 0;
function initDessertGame() {
    document.body.classList.add("dessert-mode");
    const bowl = document.getElementById('bowl-drop');
    const items = document.querySelectorAll('.ing-item');

    items.forEach(item => {
        item.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('dessertIng', e.target.id);
        });
    });

    bowl.addEventListener('dragover', e => e.preventDefault());
    bowl.addEventListener('drop', e => {
        e.preventDefault();
        const id = e.dataTransfer.getData('dessertIng');
        if(!id) return; // Diğer sürükle bıraklarla çakışmayı önler

        const el = document.getElementById(id);
        if(el && el.classList.contains('ing-item') && !el.classList.contains('used-ing')) {
            el.classList.add('used-ing');
            el.style.display = 'none'; 
            dessertIngredients++;

            bowl.style.transform = 'scale(1.2)';
            setTimeout(() => bowl.style.transform = 'scale(1)', 200);

            if(dessertIngredients === 3) {
                startMixingAnimation(bowl);
            }
        }
    });
}

function startMixingAnimation(bowl) {
    bowl.classList.add('mixing');
    setTimeout(() => {
        bowl.classList.remove('mixing');
        document.getElementById('bake-btn').classList.remove('hidden');
    }, 2500);
}

function bakeDessert() {
    document.getElementById('bowl-drop').classList.add('hidden');
    document.getElementById('bake-btn').classList.add('hidden');
    document.getElementById('the-cake').classList.remove('hidden');
}

function eatCake() {
    document.getElementById('the-cake').style.display = 'none';
    document.getElementById('dessert-question').classList.remove('hidden');
}

// ================== 10. EMİN MİSİN? ==================
let sureCount = 0;
function clickSure() {
    sureCount++;
    const btn = document.getElementById('sure-btn');
    
    if (sureCount < 10) {
        btn.innerText = `Evet (${sureCount}/10)`;
        btn.style.transform = `scale(${1 + sureCount * 0.05})`;
    } else {
        document.body.classList.remove("sure-mode");
        document.getElementById("question-10").classList.add("hidden");
        document.getElementById("final-screen").classList.remove("hidden");
    }
}