let mobileNet;
let classifier;
let video;
let label = 'Test';
let telephoneBtn;
let bananBtn;
let trainButton;

const loading = document.querySelector('.loading-title');

function modelReady() {
    console.log('Model is ready');
    loading.remove();
}

function videoReady() {
    console.log('Video is ready');
}

function gotResults(error, result) {
    if (error) {
        console.error(error);
    } else {
        console.log(result);
        label = result;
        classifier.classify(gotResults);
    }
}

function whileTraining(loss) {
    if (loss == null) {
        console.log('Training complete');
        classifier.classify(gotResults)
    } else {
        console.log(loss);
    }
}

function setup() {
    createCanvas(320, 270);
    video = createCapture(VIDEO);
    video.hide();
    background(0);
    mobileNet = ml5.featureExtractor('MobileNet', modelReady);
    classifier = mobileNet.classification(video, videoReady);

    telephoneBtn = createButton('Телефон');
    telephoneBtn.mousePressed(function () {
        classifier.addImage('Телефон');
    })

    bananBtn = createButton('Банан');
    bananBtn.mousePressed(function () {
        classifier.addImage('Банан');
    })

    trainButton = createButton('Train');
    trainButton.mousePressed(function () {
        classifier.train(whileTraining);
    })


}

function draw() {
    background(0);
    image(video, 0, 0, 320, 240);
    fill(255);
    textSize(16);
    text(label, 10, height - 10);
}
