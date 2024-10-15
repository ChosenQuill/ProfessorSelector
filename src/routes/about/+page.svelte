<script>
	import one from '$lib/images/about/1.png';
	import two from '$lib/images/about/2.png';
	import three from '$lib/images/about/3.png';
	import four from '$lib/images/about/4.png'; 

	import building from '$lib/images/building.webp';
</script>

<div class="mx-auto">
  <div class="bg-base-200 rounded-lg p-8 mx-4  lg:max-w-screen-lg prose mt-8 shadow-lg">
	  <h1 class="mb-6">About</h1>
	  <p class="mb-2">
		  <strong>Professor Selector</strong> is a data analytics tool designed to help you quickly gather information about professors for your current or upcoming courses. By leveraging metrics from various platforms, Professor Selector enables you to make informed decisions when building your semester roster.
		</p>
		
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
</div>

<main class="prose mx-auto my-8 lg:max-w-screen-lg p-4">
  <h2>Features</h2>
  <ul>
    <li>
      <strong>Comprehensive Professor Profiles:</strong> Dive deep into detailed information about each professor, including ratings, difficulty levels, and student feedback from multiple platforms to make well-informed decisions.
    </li>
    <li>
      <strong>Intuitive Course Management:</strong> Effortlessly search for courses, add them to your roster, and manage your selections with a user-friendly interface that simplifies the entire process.
    </li>
    <li>
      <strong>Prioritized Selections:</strong> Choose up to three professors per course, allowing you to prioritize your preferences and increase your chances of registering with your top choices.
    </li>
    <li>
      <strong>Real-Time Metrics:</strong> Stay updated with the latest data and insights, helping you evaluate and compare professors effectively.
    </li>
    <li>
      <strong>Seamless Mobile Experience:</strong> Manage your roster on the go with a responsive design optimized for both smartphones and desktops, ensuring accessibility wherever you are.
    </li>
  </ul>
  
  <h2>How To Use</h2>
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
  
  <h2>Support</h2>
  <p>
    If you encounter any issues or have questions about using Professor Selector, feel free to reach out through via email at <code>hello{"{at}"}rithvik.pro</code>.
  </p>
  
  <h2>License</h2>
  <p>© 2024 Xeno Industries LLC. All rights reserved.</p>
</main>
