<script>
	import { onMount } from 'svelte';
	import "../app.css";
  
	import logoAvifSm from '$lib/images/logo-small.avif';
	import logoAvif from '$lib/images/logo.avif';
	import logoWebpSm from '$lib/images/logo-small.webp';
	import logoWebp from '$lib/images/logo.webp';
  
  
	import { toasts } from '$lib/toasts';
	import { page } from '$app/stores';
  
	import { menu } from '$lib/storage';
  
	let isScrolled = false; 
	let isMobile = false;
  
	onMount(() => {
	  // Function to check if the viewport is mobile-sized
	  const checkMobile = () => {
		isMobile = window.innerWidth < 768; // Tailwind's 'md' breakpoint is 768px
	  };
  
	  // Function to handle scroll events
	  const handleScroll = () => {
		if (window.scrollY > 0) {
		  isScrolled = true;
		} else {
		  isScrolled = false;
		}
	  };
  
	  // Initial checks
	  checkMobile();
	  handleScroll();
  
	  // Add event listeners
	  window.addEventListener('resize', checkMobile);
	  window.addEventListener('scroll', handleScroll);
  
	  // Cleanup event listeners on component destroy
	  return () => {
		window.removeEventListener('resize', checkMobile);
		window.removeEventListener('scroll', handleScroll);
	  };
	});
  </script>
  
  <svelte:head>
	<title>Professor Selector</title>
	<meta name="description" content="Get Info on your classes" />
	<link rel="icon" type="image/png" href={logoWebp} />
  </svelte:head>
  
  <div class="main-flex app">
	<header
	  class="p-4 w-full flex text-lg z-50"
	  class:fixed={isScrolled && isMobile}
	  class:top-0={isScrolled && isMobile}
	  class:left-0={isScrolled && isMobile}
	  class:w-full={isScrolled && isMobile}
	  class:shadow-md={isScrolled && isMobile && !$menu}
	  class:bg-base-100={isScrolled && isMobile}
	>
	  <ul class="pop flex flex-row">
		<button
		  on:click={ev => {
			if ($page.url.pathname.startsWith('/app')) {
			  $menu = !$menu;
			}
		  }}
		  class:highlight={$menu}
		  class="block md:hidden mr-2 mt-[0.1rem] transition-colors"
		>
		  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-menu">
			<line x1="4" x2="20" y1="12" y2="12"/>
			<line x1="4" x2="20" y1="6" y2="6"/>
			<line x1="4" x2="20" y1="18" y2="18"/>
		  </svg>
		</button>
		<li><a href="/" class:highlight={$page.url.pathname == '/'}>Home</a></li>
		<li><a href="/app" class:highlight={$page.url.pathname.startsWith('/app')}>App</a></li>
		<li><a href="/about" class:highlight={$page.url.pathname.startsWith('/about')}>About</a></li>
	  </ul>
	</header>
	
	<main
	  class="main main-flex h-full w-full"
	  class:pt-16={isScrolled && isMobile} 
	  >
	  <slot />
	</main>
	
	<footer class="footer items-center p-4 bg-base-300 text-neutral-content">
	  <div class="flex items-center h-full">
		<picture>
		  <source srcset="{logoAvifSm} 1x, {logoAvif} 2x" type="image/avif">
		  <source srcset="{logoWebpSm} 1x, {logoWebp} 2x" type="image/webp">
		  <img src={logoWebpSm} width="36" height="36" class="mr-1" alt="Logo">
		</picture>
		<p>Xeno Industries LLC.<br />Providing reliable tech since 2018</p>
	  </div>
	  <!-- instead of these elements: md:place-self-center md:justify-self-end  -->
	   <!-- We use these to not modify footer size:  hidden md:grid -->
	  <div class="grid-flow-col gap-4 justify-self-end hidden md:grid">
		<a target="_blank" rel="noreferrer" href="https://twitter.com/chosenquill" aria-label="Twitter">
		  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="fill-current">
			<path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
		  </svg>
		</a>
		<a target="_blank" rel="noreferrer" href="https://youtube.com/@chosenquill" aria-label="Youtube">
		  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="fill-current">
			<path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
		  </svg>
		</a>
		<a target="_blank" rel="noreferrer" href="https://www.facebook.com/rithvik.se/" aria-label="Facebook">
		  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="fill-current">
			<path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
		  </svg>
		</a>
	  </div>
	</footer>
  </div>
  
  <div class="toast toast-end z-50">
	{#each $toasts as toast}
	  <div class="alert alert-{toast.type} transition-all shadow-lg z-50">
		{#if toast.type == 'error'}
		  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current flex-shrink-0 w-6 h-6">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
		  </svg>
		{:else if toast.type == 'warning'}
		  <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
		  </svg>
		{:else if toast.type == 'success'}
		  <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
		  </svg>
		{:else}
		  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-info flex-shrink-0 w-6 h-6">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
		  </svg>
		{/if}
		<span>{toast.text}</span>
	  </div>
	{/each}
  </div>
  <div class="alert-error alert-info alert-warning alert-success hidden" />
  
  <style lang="scss">
	.pop > li {
	  @apply hover:text-gray-100 duration-300 mr-4 link link-hover;
	  transition-property: color text-decoration-line;
	}
	.highlight {
	  @apply text-gray-200;
	}
	.main-flex {
	  display: flex;
	  flex-direction: column;
	}
	.app {
	  min-height: 100vh;
	}
	.main {
	  flex-grow: 1;
	}
  </style>
  