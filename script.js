//your JS code here. If required.
var selectedImages = [];
var verifyButtonClicked = false;

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

function renderImages() {
  var imageTags = document.querySelectorAll('img');
  var classNames = ['img1', 'img2', 'img3', 'img4', 'img5', 'img6'];
  var repeatedClass = classNames[Math.floor(Math.random() * classNames.length)];

  var shuffledClassNames = shuffleArray(classNames);
  for (var i = 0; i < imageTags.length; i++) {
    imageTags[i].src = 'API_URL'; // Replace 'API_URL' with your actual API URL or image sources
    imageTags[i].className = shuffledClassNames[i];
    if (shuffledClassNames[i] === repeatedClass) {
      imageTags[i].addEventListener('click', selectImage);
    }
  }
}

function selectImage(element) {
  if (!verifyButtonClicked) {
    element.classList.add('selected');
    selectedImages.push(element);
    if (selectedImages.length === 2) {
      document.getElementById('verify').style.display = 'inline';
      document.getElementById('reset').style.display = 'inline';
    }
  }
}

function resetState() {
  var selectedElements = document.getElementsByClassName('selected');
  while (selectedElements.length > 0) {
    selectedElements[0].classList.remove('selected');
  }
  selectedImages = [];
  verifyButtonClicked = false;
  document.getElementById('verify').style.display = 'none';
  document.getElementById('reset').style.display = 'none';
  document.getElementById('para').textContent = '';
}

function verifySelection() {
  verifyButtonClicked = true;
  if (selectedImages.length === 2) {
    var class1 = selectedImages[0].className;
    var class2 = selectedImages[1].className;
    if (class1 === class2) {
      document.getElementById('para').textContent = 'You are a human. Congratulations!';
    } else {
      document.getElementById('para').textContent = 'We can\'t verify you as a human. You selected the non-identical tiles.';
    }
    document.getElementById('verify').style.display = 'none';
  }
}

renderImages();
