const buttonOne = document.getElementById("one");
const buttonTwo = document.getElementById("two");
const buttonThree = document.getElementById("three");

const indicators = document.getElementById("indicators");

const sheet = document.getElementById("sheet");

const pageOne = document.getElementById("first");
const pageTwo = document.getElementById("second");
const pageThree = document.getElementById("third");

const scrollToPage = (page) => {
	sheet.scroll({
  	behavior: "smooth",
  	left: page.offsetLeft,
  });
};

buttonOne.addEventListener("click", () => scrollToPage(pageOne));
buttonTwo.addEventListener("click", () => scrollToPage(pageTwo));
buttonThree.addEventListener("click", () => scrollToPage(pageThree));

const setCurrentPage = (page) => {
	const pageId = page.getAttribute("id");
  console.log(pageId);
	switch (pageId) {
  	case "first":
    	indicators.setAttribute("data-current", "1");
      break;

    case "second":
      indicators.setAttribute("data-current", "2");
      break;

    case "third":
      indicators.setAttribute("data-current", "3");
      break;
  }
};

const observer = new IntersectionObserver(entries => {
	for (let i = 0; i < entries.length; i++) {
  	if (entries[i].isIntersecting) {
    	setCurrentPage(entries[i].target);
    }
  }
}, { threshold: [1] });

observer.observe(pageOne);
observer.observe(pageTwo);
observer.observe(pageThree);
