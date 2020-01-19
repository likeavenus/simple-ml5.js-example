let mobileNet;
let classifier;
let video;
let label = 'Test';
let telephoneBtn;
let bananBtn;
let unknownBtn;
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
        label = result[0].label;
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

const options = {
    learningRate: 0.0001,
    hiddenUnits: 100,
    numLabels: 3,
    epochs: 30,
};

function setup() {
    createCanvas(320, 270);
    video = createCapture(VIDEO);
    video.hide();
    background(0);
    mobileNet = ml5.featureExtractor('MobileNet', options, modelReady);
    classifier = mobileNet.classification(video, videoReady);

    telephoneBtn = createButton('Телефон');
    telephoneBtn.mousePressed(function () {
        classifier.addImage('Телефон');
    })

    bananBtn = createButton('Банан');
    bananBtn.mousePressed(function () {
        classifier.addImage('Банан');
    })

    unknownBtn = createButton('Unknown');
    unknownBtn.mousePressed(function () {
        classifier.addImage('unknown');
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
