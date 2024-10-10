<style>
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
</style>

<section class="hero flex-grow">
	<div class="hero-content text-center">
		<div class="max-w-lg">
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
