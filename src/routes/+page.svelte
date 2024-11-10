<script>
	import man from '$lib/images/home/man.avif';
	import women from '$lib/images/home/women.avif';
</script>
  
  <style lang="scss">
	.gradient-text {
	  background: linear-gradient(90deg, #ff0080, #ff8c00, #40e0d0, #8a2be2);
	  background-size: 400% 400%;
	  animation: gradientAnimation 10s ease infinite;
	  background-clip: text;
	  -webkit-background-clip: text;
	  -webkit-text-fill-color: transparent;
	}
  
	@keyframes gradientAnimation {
	  0% { background-position: 0% 50%; }
	  50% { background-position: 100% 50%; }
	  100% { background-position: 0% 50%; }
	}
  
	.gradient-border {
	  position: relative;
	  border: 1.5px solid transparent;
	  border-radius: 12px;
	  padding: 2px; // Space between border and content
	  background:
		linear-gradient(#15191e, #15191e) padding-box, // Inner background
		linear-gradient(45deg, #1d232a, #687aff) border-box; // Gradient border
  
	  transition: transform 0.2s ease-in-out;
	  &:hover,
	  &:focus-within,
	  &:active {
		transform: scale(1.05);
	  }
	}
  
	// Card Content
	.card-content {
	  @apply bg-base-300;
	  border-radius: 10px; // Slightly less than parent to reveal border
	  padding: 1.5rem;
	  color: #ffffff; // Text color
	}
  
	// Page Spacing Adjustments
	.features-section,
	.how-it-works-section,
	.testimonials-section,
	.cta-section,
	.about-section {
	  max-width: 1200px;
	  margin: 0.5rem auto;
	  padding: 2rem 1rem;
	}
  
	.cta-section {
	  margin-bottom: 3rem;
	}
  
	.hero-section {
	  padding: 4rem 1rem;
	}
  
	@media (min-width: 768px) {
	  .hero-section {
		padding: 6rem 1rem;
	  }
	}
  
	.testimonial-card {
	  @apply bg-base-300 rounded-lg p-6;
	}
  </style>
  
<!-- Hero Content -->
  <section class="hero flex-grow hero-section">
	<div class="hero-content text-center">
	  <div class="max-w-lg mx-auto">
		<h1 class="text-5xl font-extrabold mb-4 gradient-text">Professor Selector</h1>
		<p class="text-lg text-gray-300 mb-6">
		  Empower your academic journey by selecting the best professors at UTD.
		</p>
		<a
		  class="btn btn-primary text-white px-6 py-3 rounded-md shadow-lg transition duration-300"
		  href="/app"
		>
		  Get Started
		</a>
	  </div>
	</div>
  </section>

<!-- Features -->
  <div class="features-section">
	<div class="text-3xl font-bold text-center mb-8">Why Choose Professor Selector?</div>
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 ">
	  <!-- Feature 1 -->
	  <div class="gradient-border">
		<div class="card-content flex flex-col items-center">
		  <div class="mb-4">
			<svg class="w-12 h-12 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
				<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
			</svg>
		  </div>
		  <h2 class="text-xl font-semibold mb-2 text-center">Access Comprehensive Professor <br /> Information</h2>
		  <p class="text-gray-300 text-center">
			Dive deep into detailed information about the course's professors, including ratings, difficulty levels, and grades from multiple platforms—all in one place.
		  </p>
		</div>
	  </div>
  
	  <!-- Feature 2 -->
	  <div class="gradient-border">
		<div class="card-content flex flex-col items-center">
		  <div class="mb-4">
			<svg class="w-12 h-12 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7h18M3 12h18M3 17h18" />
			</svg>
		  </div>
		  <h2 class="text-xl font-semibold mb-2 text-center">Simplify Your Course <br /> Management</h2>
		  <p class="text-gray-300 text-center">
			Effortlessly search and add courses to your roster with our minimal interface, making course selection a breeze.
		  </p>
		</div>
	  </div>
  
	  <!-- Feature 3 -->
	  <div class="gradient-border">
		<div class="card-content flex flex-col items-center">
		  <div class="mb-4">
			<svg class="w-12 h-12 text-yellow-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
			</svg>
		  </div>
		  <h2 class="text-xl font-semibold mb-2 text-center">Prioritize Your Professor <br /> Preferences</h2>
		  <p class="text-gray-300 text-center">
			Select up to three preferred professors per course to optimize your schedule and increase your chances of getting your top choices.
		  </p>
		</div>
	  </div>
  
	  <!-- Feature 4 -->
	  <div class="gradient-border">
		<div class="card-content flex flex-col items-center">
		  <div class="mb-4">
			<svg class="w-12 h-12 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12.17a9 9 0 11-8-8.95" />
			</svg>
		  </div>
		  <h2 class="text-xl font-semibold mb-2 text-center">Stay Informed with Real-Time <br /> Metrics</h2>
		  <p class="text-gray-300 text-center">
			Access up-to-date data and insights to evaluate and compare professors effectively, ensuring you make the best decisions for your education.
		  </p>
		</div>
	  </div>
  
	  <!-- Feature 5 -->
	  <div class="gradient-border">
		<div class="card-content flex flex-col items-center">
		  <div class="mb-4">
			<svg class="w-12 h-12 text-purple-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"  stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
			  <!-- <path d="M11 19a2 2 0 100-4 2 2 0 000 4zM6 13a2 2 0 100-4 2 2 0 000 4zM18 13a2 2 0 100-4 2 2 0 000 4z" /> -->
			  <rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/>
			</svg>
		  </div>
		  <h2 class="text-xl font-semibold mb-2 text-center">Enjoy a Seamless Mobile <br /> Experience</h2>
		  <p class="text-gray-300 text-center">
			Manage your roster anytime, anywhere with our responsive design optimized for both smartphones and desktops.
		  </p>
		</div>
	  </div>
  
	  <!-- Feature 6 -->
	  <div class="gradient-border">
		<div class="card-content flex flex-col items-center">
		  <div class="mb-4">
			<svg class="w-12 h-12 text-teal-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
			  <path d="M9 12h6m-6 4h6m2-10h1a2 2 0 012 2v12a2 2 0 01-2 2h-7m-5 0H5a2 2 0 01-2-2V8a2 2 0 012-2h1" />
			  <!-- <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"/><path d="M22 10v6"/><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/> -->
			</svg>
		  </div>
		  <h2 class="text-xl font-semibold mb-2 text-center">Make Informed Decisions Effortlessly</h2>
		  <p class="text-gray-300 text-center">
			Let Professor Selector streamline your course planning process, so you can focus on what matters most—your education.
		  </p>
		</div>
	  </div>
	</div>
  </div>
  
  <!-- How It Works -->
  <div class="how-it-works-section my-12">
	<h2 class="text-3xl font-bold text-center mb-6">How It Works</h2>
	<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
	  <!-- Step 1 -->
	  <div class="flex flex-col items-center">
		<!-- NOTE: Possibly change these to mb-2 -->
		<div class="mb-4">
		  <svg class="w-12 h-12 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
		  </svg>
		</div>
		<h3 class="text-xl font-semibold mb-2 text-center">Search for a Course</h3>
		<p class="text-gray-300 text-center">
		  Easily find your desired courses using our intuitive search functionality.
		</p>
	  </div>
	  <!-- Step 2 -->
	  <div class="flex flex-col items-center">
		<div class="mb-4">
		  <svg class="w-12 h-12 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
		  </svg>
		</div>
		<h3 class="text-xl font-semibold mb-2 text-center">Select Professors</h3>
		<p class="text-gray-300 text-center">
		  Choose up to three preferred professors for each course.
		</p>
	  </div>
	  <!-- Step 3 -->
	  <div class="flex flex-col items-center">
		<div class="mb-4">
		  <svg class="w-12 h-12 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7h18M3 12h18M3 17h18" />
		  </svg>
		</div>
		<h3 class="text-xl font-semibold mb-2 text-center">Build Your Roster</h3>
		<p class="text-gray-300 text-center">
		  Review and manage your selections to create the optimal schedule.
		</p>
	  </div>
	</div>
  </div>
  
<div class="testimonials-section my-12">
	<h2 class="text-3xl font-bold text-center mb-6">What Our Users Say</h2>
	<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
		<div class="testimonial-card">
			<p class="text-gray-300 italic">
				"Professor Selector has completely changed how I plan my semesters. I feel more confident in my course choices now!"
			</p>
			<div class="mt-4 flex items-center">
				<img src={man} alt="User Avatar" class="w-12 h-12 rounded-full mr-4">
				<div>
					<p class="text-white font-semibold">Alex Johnson</p>
					<p class="text-gray-400 text-sm">Computer Science Major</p>
				</div>
			</div>
		</div>
		<div class="testimonial-card">
			<p class="text-gray-300 italic">
				"A must-have tool for any student at UTD. It's made choosing professors so much easier."
			</p>
			<div class="mt-4 flex items-center">
				<img src={women} alt="User Avatar" class="w-12 h-12 rounded-full mr-4">
				<div>
					<p class="text-white font-semibold">Maria Lopez</p>
					<p class="text-gray-400 text-sm">Business Administration Major</p>
				</div>
			</div>
		</div>
	</div>
</div>

<!-- Call to Action -->
<div class="cta-section my-12 text-center">
	<h2 class="text-2xl font-bold mb-4">Ready to Optimize Your Schedule?</h2>
	<a
		class="btn btn-primary text-white px-6 py-3 rounded-md shadow-lg transition duration-300"
		href="/app"
	>
		Get Started Now
	</a>
</div>