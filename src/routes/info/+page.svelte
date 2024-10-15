<script>
	import building from '$lib/images/building.webp'
</script>

<main class="main h-full w-full hero flex-grow">
	<div class="hero-content flex-col lg:flex-row-reverse w-full">
		<!-- src="https://placeimg.com/260/400/arch" -->
		<img
			alt="Asthetic Building"
			src={building}
			class="max-w-sm rounded-lg shadow-2xl"
		/>
		<div class="w-80">
			<h1 class="text-5xl font-bold">Info</h1>
			<p class="pt-6 pb-3">
				UTD Professor Selector is a data analytics tool to help you pick the best professors!
			</p>
			<p class="pb-6">Built by Rithvik S. w/&nbsp;&nbsp;❤️</p>
			<a
				class="btn btn-outline"
				target="_blank"
				rel="noreferrer"
				href="https://www.paypal.com/paypalme/chosenrs">Donate</a
			>
			<!-- <p class="pb-3">If you found this project useful. Please feel free to donate.</p> -->
		</div>
	</div>
</main>
