<script>
	import one from '$lib/images/about/1.png';
	import two from '$lib/images/about/2.png';
	import three from '$lib/images/about/3.png';
	import four from '$lib/images/about/4.png'; 

	import building from '$lib/images/building.webp';
</script>

<style lang="scss">
  .prose img {
    @apply rounded-2xl p-2 bg-base-100;
  }
  .prose blockquote ::before, ::after {
    display: none;
  }
  .prose blockquote {
    margin: 0px;
    font-style: normal;
    font-weight: 00;
  }
  
  // .collapse-arrow > .collapse-title:after {
  //   transition-duration: 300ms;
  //   transition-duration: .4s;
  //   height: .85rem;
  //   width: .85rem;
  //   box-shadow: 3px 3px;
  // Collapse arrow is not showing up (maybe taken out of postcss), so instead, we manually inject the collapse arrow styles from daisyui.

  .collapse-arrow > .collapse-title:after {
    position: absolute;
    display: block;
    --tw-translate-y: -100%;
    --tw-rotate: 45deg;
    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-timing-function: cubic-bezier(0, 0, 0.2, 1);
    top: 1.9rem /* 30.4px */;
    inset-inline-end: 1.4rem /* 22.4px */;
    content: "";
    transform-origin: 75% 75%;
    pointer-events: none;
    
    // Modified CSS values for larger and slower collapse arrow icon.
    transition-duration: 400ms;
    transition-duration: .4s;
    height: .95rem;
    width: .95rem;
    box-shadow: 3px 3px;
    transition-duration: 150ms;
    transition-duration: 0.2s;
    border-radius: 2px;
  }
  .collapse[open].collapse-arrow > .collapse-title:after,
  .collapse-open.collapse-arrow > .collapse-title:after,
  .collapse-arrow:focus:not(.collapse-close) > .collapse-title:after,
  .collapse-arrow:not(.collapse-close) > input[type="checkbox"]:checked ~ .collapse-title:after,
  .collapse-arrow:not(.collapse-close) > input[type="radio"]:checked ~ .collapse-title:after {
      --tw-translate-y: -50%;
      --tw-rotate: 225deg;
      transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  }
  .collapse[open].collapse-arrow > .collapse-title:after,
  .collapse-open.collapse-arrow > .collapse-title:after,
  .collapse-arrow:focus:not(.collapse-close) > .collapse-title:after,
  .collapse-arrow:not(.collapse-close) > input[type="checkbox"]:checked ~ .collapse-title:after,
  .collapse-arrow:not(.collapse-close) > input[type="radio"]:checked ~ .collapse-title:after {
      --tw-translate-y: -50%;
      --tw-rotate: 225deg;
      transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  }
  .collapse[open].collapse-arrow > .collapse-title:after,
  .collapse-open.collapse-arrow > .collapse-title:after,
  .collapse-arrow:focus:not(.collapse-close) > .collapse-title:after,
  .collapse-arrow:not(.collapse-close) > input[type="checkbox"]:checked ~ .collapse-title:after,
  .collapse-arrow:not(.collapse-close) > input[type="radio"]:checked ~ .collapse-title:after {
      --tw-translate-y: -50%;
      --tw-rotate: 225deg;
      transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  }
  .collapse[open].collapse-arrow > .collapse-title:after,
  .collapse-open.collapse-arrow > .collapse-title:after,
  .collapse-arrow:focus:not(.collapse-close) > .collapse-title:after,
  .collapse-arrow:not(.collapse-close) > input[type="checkbox"]:checked ~ .collapse-title:after,
  .collapse-arrow:not(.collapse-close) > input[type="radio"]:checked ~ .collapse-title:after {
      --tw-translate-y: -50%;
      --tw-rotate: 225deg;
      transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  }
  .collapse[open].collapse-arrow > .collapse-title:after,
  .collapse-open.collapse-arrow > .collapse-title:after,
  .collapse-arrow:focus:not(.collapse-close) > .collapse-title:after,
  .collapse-arrow:not(.collapse-close) > input[type="checkbox"]:checked ~ .collapse-title:after,
  .collapse-arrow:not(.collapse-close) > input[type="radio"]:checked ~ .collapse-title:after {
      --tw-translate-y: -50%;
      --tw-rotate: 225deg;
      transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  }
</style>

<div class="flex flex-col justify-center mx-auto p-2 lg:p4">
  <div class="bg-base-200 rounded-lg p-8 lg:max-w-screen-lg prose mt-8 shadow-lg">
	  <h1 class="mb-6">About</h1>
	  <p class="mb-2">
		  <strong>Professor Selector</strong> is a data analytics tool designed to help you quickly gather information about professors for your current or upcoming courses. By leveraging metrics from various platforms, Professor Selector enables you to make informed decisions when building your semester roster.
		</p>

    <p class="mb-0">
      If you encounter any issues or have questions, feel free to reach out through via email at <code>hello{"{at}"}rithvik.pro</code>.
    </p>
    <div class="flex flex-row items-center justify-between gap-4 mt-5">
      <strong class="m-0">Built by Rithvik S. w/&nbsp;&nbsp;💖 <br /> © 2024 Xeno Industries LLC.</strong>
      <!-- <blockquote>
      </blockquote> -->
      <a
      class="btn btn-outline"
      target="_blank"
      rel="noreferrer"
      href="https://www.paypal.com/paypalme/chosenrs">
        Donate
      </a>
    </div>
    
    <!-- <h2>License</h2> -->
    <!-- <p>© 2024 Xeno Industries LLC. All rights reserved.</p> -->
		
	<!-- <div class="flex flex-row items-center justify-between gap-4">
		<a
		class="btn btn-outline"
		target="_blank"
		rel="noreferrer"
		href="https://www.paypal.com/paypalme/chosenrs">
			Donate
		</a>
		<p>Built by Rithvik Senthilkumar w/&nbsp;&nbsp;💖</p>
	</div> -->
  </div>
  
  <div class="prose my-8 lg:max-w-screen-lg p-4 collapse collapse-arrow bg-base-200 duration-700">
    <input type="checkbox" class="peer" />
    <h2 class="mb-0 mt-0 collapse-title">How To Use</h2>
    <div class="
        max-h-0
        overflow-hidden
        transition-all
        duration-700
        ease-in-out
        peer-checked:max-h-[3000px]
        peer-checked:opacity-100
        peer-checked:overflow-visible
        px-4
        
        ">
      <p>
        The goal of ProfessorSelector is to help you create a roster for the current or upcoming semester by selecting the professors you'd like to register with. If your top choice is unavailable, you can choose from your next preferences. The application displays relevant metrics to assist you in your research and decision-making process.
      </p>
      <p>
          <strong>
            Follow these steps to effectively use the Professor Selector application.
          </strong>
      </p>
    
      
      <h3>1. Search for a Course</h3>
      <p>Start by searching for a course using the search bar.</p>
      <img src={one} alt="Search for a Course">
      <ul>
        <li><strong>Action:</strong> Type the course name into the search field and click the <strong>Search</strong> button.</li>
      </ul>
      
      <h3>2. Add the Course to Your Roster</h3>
      <p>Once you've found the desired course, add it to your roster.</p>
      <img src={two} alt="Add Course to Roster">
      <ul>
        <li><strong>Action:</strong> Click the <strong>+</strong> button next to the course to add it to your roster.</li>
      </ul>
      
      <h3>3. Select Your Preferred Professors</h3>
      <p>Choose your top three professors for the course.</p>
      <img src={three} alt="Select Professors">
      <ul>
        <li><strong>Action:</strong> Use the checkboxes to the left of each professor's name to select your first, second, and third choices.</li>
        <li><strong>Note:</strong> You can select up to three professors. If you attempt to select more, a warning message will prompt you to unselect a choice before adding another.</li>
      </ul>
      
      <h3>4. View and Manage Your Roster</h3>
      <p>After selecting your professors, navigate to your roster to review your choices.</p>
      <img src={four} alt="View Roster">
      <ul>
        <li><strong>Action:</strong> 
          <ul>
            <li><strong>On Mobile:</strong> Tap the hamburger menu and then the <strong>Home</strong> button in the top right of the courses menu.</li>
            <li><strong>On Desktop:</strong> Click the <strong>Home</strong> button directly in the courses menu.</li>
          </ul>
        </li>
        <li><strong>Outcome:</strong> You'll be directed to the roster page where you can view your selected professors and access additional metrics to further inform your decisions.</li>
      </ul>
    </div>
  </div>
</div>

<div class="collapse-arrow hidden collapse-content collapse" />
<!-- <div class="prose mx-auto my-8 lg:max-w-screen-lg p-8 bg-base-200 rounded-2xl">
  <h2>Support</h2>

</div> -->
