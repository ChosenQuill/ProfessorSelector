<script>
	import { onMount } from 'svelte';
	import { addToast } from '$lib/toasts';
	import { browser } from '$app/environment';
	import { courses, menu, semester } from '$lib/storage';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';  
	import { getNextSemester } from '$lib/helper';
  
	import { slide } from "svelte/transition";
	import { navigating } from '$app/stores';
  
	import Shepherd from 'shepherd.js';
	import 'shepherd.js/dist/css/shepherd.css';
  
	let className = '';
	// let current = ''
  
	const addClass = async () => {
	  if (!className) {
		return;
	  }
	  const classRE = /(\w+)( |\.)(\d+)/g;
	  const res = classRE.exec(className);
	  if (res) {
		const section = res[1].toUpperCase();
		const number = res[3];
		// Close the menu on mobile after adding a class
		menu.set(false);
		goto(`/app/course/${section}/${number}${$semester != getNextSemester() ? '?semester=' + $semester : ''}`);
	  } else {
		addToast({ type: 'error', text: 'You have entered an invalid class.' });
	  }
	}
  
	const removeClass = (id) => {
	  $courses[$semester][id].roster = false;
	  $courses = $courses;
  
	  // Additional logic can be uncommented and used as needed
	  // const ids = Object.keys(courses);
	  // if (ids.length <= 1) {
	  //   current = '';
	  // } else {
	  //   const pos = ids.indexOf(id);
	  //   current = ids[pos - 1];
	  // }
	  // delete courses[id];
	  // courses.set(courses);
	};
  
	// console.log($page.url.pathname)
  
  
	// const addClass = async () => {
	//   if (!className) {
	//     return;
	//   }
	//   const classRE = /(\w+)( |\.)(\d+)/g;
	//   const res = classRE.exec(className);
	//   if (res) {
	//     const section = res[1].toUpperCase();
	//     const number = res[3];
  
	//     const found = Object.values(courses).findIndex(
	//       (course) => course.section == section && course.number == number
	//     );
	//     if (found != -1) {
	//       addToast({ type: 'info', text: 'You have already have this course added.' });
	//       return;
	//     }
	//     try {
	//       const fres = await fetch(`/api/course/${section}/${number}`);
	//       if (fres?.status != 200) {
	//         if(fres?.status == 404) {
	//           addToast({ type: 'error', text: "The course you entered doesn't exist." });
	//           return;
	//         }
	//         addToast({ type: 'error', text: "Can't get course data. (UTD Nebula might be down)" });
	//         return;
	//       }
	//       const course = await fres.json();
	//       if (course) {
	//         const id = course._id;
	//         $courses[$semester][id].info = course;
	//         $courses = $courses;
  
	//         className = '';
	//         addToast({ type: 'success', text: 'Added class to list!' });
	//         if (Object.keys(courses).length == 1) {
	//           current = id;
	//         }
	//         const res3 = await fetch(`/api/professors/${id}`);
	//         if (res3?.status != 200) {
	//           if(res3?.status == 404) {
	//             addToast({ type: 'error', text: "Can't find professor information." });
	//             return;
	//           }
	//           addToast({ type: 'error', text: "Can't get professor information." });
	//           courses[id].professors = [];
	//           return;
	//         }
	//         const json3 = await res3.json();
	//         $courses[$semester][id].professors = json3;
	//         $courses = $courses;
	//       } else {
	//         addToast({ type: 'error', text: 'You have entered an invalid class.' });
	//       }
	//     } catch (e) {
	//       addToast({ type: 'error', text: 'Error Accessing Api: Try again later.' });
	//       console.error(e);
	//     }
	//   } else {
	//     addToast({ type: 'error', text: 'You have entered an invalid class.' });
	//   }
	// };
	// const removeClass = (id) => {
	//   const ids = Object.keys(courses);
	//   if (ids.length <= 1) {
	//     current = '';
	//   } else {
	//     const pos = ids.indexOf(id);
	//     current = ids[pos - 1];
	//   }
	//   delete courses[id];
	//   courses = courses;
	// };
  
	// TODO Add a classes header
	// TODO mobile optimization
  
	if(!Object.hasOwn($courses, $semester)) {
	  courses.update(x => {
		return {
		...x,
		[$semester]: {}
	  }});
	}
  
	let isMobile = false;
	let prev = 0;
	onMount(() => {
	  if (browser) {
		const checkMobile = () => {
		  // On mobile, when keyboard is open, resize event is added. This checks to see if it has resized after the first time. 
		  if(prev != window.innerWidth) {
			isMobile = window.innerWidth < 768;
			// Automatically show the menu on desktop
			if (!isMobile) {
			  menu.set(true);
			} else if(Object.entries($courses[$semester]).filter(obj => obj[1]?.roster).length > 0 || $page.url.pathname !== '/app') {
			  menu.set(false);
			}
			prev = window.innerWidth;
		  }
		  // console.log(window.innerWidth);
		}
		checkMobile();
		window.addEventListener('resize', checkMobile);
  
		// Tour Logic
		const tourCompleted = localStorage.getItem('tourCompleted');
		if (!tourCompleted && $page.url.pathname === '/app') {
		  showTourModal = true;
		}
  
		return () => {
		  window.removeEventListener('resize', checkMobile);
		}
	  }
  
	});
  
	// Reactive statement to control body overflow
	$: if (browser) {
	  if ($menu && isMobile) {
		document.body.style.overflow = 'hidden';
	  } else {
		document.body.style.overflow = '';
	  }
	}
  
	let showTourModal = false;
  
	// Function to start the tour
	const startTour = () => {
	  showTourModal = false;
	  const tour = new Shepherd.Tour({
		defaultStepOptions: {
		  classes: 'shepherd-theme-custom',
		//   scrollTo: true,
		  cancelIcon: {
			enabled: true
		  }
		}
	  });
  
	  // Proceed to next step when ECS 1100 is added
	  const checkClassAdded = () => {
		const classExists = Object.hasOwn($courses, $semester) && Object.hasOwn($courses[$semester],'ECS1100');
		if (classExists) {
		  tour.next();
		} else {
		  setTimeout(checkClassAdded, 500);
		}
	  };

	  const checkMenuOpen = () => {
		if($menu) {
			tour.next()
		} else {
			setTimeout(checkMenuOpen, 500);
		}
	  }

	  if(isMobile && !$menu) {
		tour.addStep({
			id: 'select-menu-step',
			text: 'Open the menu to add a course.',
			attachTo: {
				element: '#menu-icon',
				on:'bottom'
			},
			advanceOn: {
				selector: '#menu-icon',
				event: 'click'
			}
			// beforeShowPromise: async () => {
			// 	checkMenuOpen();
			// }
		})
	  }
  
	  // Define tour steps
	  tour.addStep({
		id: 'add-class-step',
		text: 'Add the Class ECS 1100 to view information about the course.',
		attachTo: {
		  element: '#add-class-card',
		  on: 'bottom'
		},
		beforeShowPromise: async () => {
		  // Ensure ECS1100 is not already added
		  if(Object.hasOwn($courses,$semester) && Object.hasOwn($courses[$semester], 'ECS1100')) {
			delete $courses[$semester]['ECS1100'];
			$courses = $courses;
		  }
		  // Wait for the element to be available
		  await new Promise(resolve => {
			const checkElement = () => {
			  const el = document.querySelector('#add-class-card');
			  if (el) {
				resolve(true);
			  } else {
				setTimeout(checkElement, 100);
			  }
			};
			checkElement();
		  });
		  checkClassAdded();
		}
	  });
  
	  tour.addStep({
		id: 'add-to-roster-step',
		text: 'Click the plus button to add the course to your roster.',
		attachTo: {
		  element: '#add-to-roster-button',
		  on: isMobile ? 'bottom' : 'right'
		},
		beforeShowPromise: async () => {
		  // Wait for the element to be available
		  await new Promise(resolve => {
			const checkElement = () => {
			  const el = document.querySelector('#add-to-roster-button');
			  if (el) {
				resolve(true);
			  } else {
				setTimeout(checkElement, 100);
			  }
			};
			checkElement();
		  });
		  // Wait for user action
		  checkCourseAddedToRoster();
		}
	  });
  
	  // Wait for user to click the add-to-roster button
	  const checkCourseAddedToRoster = () => {
		const course = $courses[$semester]['ECS1100'];
		if (course && course.roster) {
		  tour.next();
		} else {
		  setTimeout(() => checkCourseAddedToRoster(), 500);
		}
	  };
  
	  const checkProfessorAdded = (number) => {
		const course = $courses[$semester]['ECS1100'];
		if(Object.hasOwn(course, 'selections') && course.selections?.length == number) {
		  tour.next();
		} else {
		  setTimeout(() => checkProfessorAdded(number), 500);
		}
	  }
  
	  // Steps for selecting professors
	  tour.addStep({
		id: 'select-first-prof',
		text: 'Select your first professor.',
		attachTo: {
		  element: '#prof-checkbox-0',
		  on: isMobile ? 'bottom' : 'right'
		},
		beforeShowPromise: async () => {
		  await new Promise(resolve => {
			const checkElement = () => {
			  const el = document.querySelector('#prof-checkbox-0');
			  if (el) {
				resolve(true);
			  } else {
				setTimeout(checkElement, 100);
			  }
			};
			checkElement();
		  });
		  checkProfessorAdded(1);
		}
	  });
  
	  tour.addStep({
		id: 'select-second-prof',
		text: 'Select your second professor.',
		attachTo: {
		  element: '#prof-checkbox-1',
		  on: isMobile ? 'bottom' : 'right'
		},
		beforeShowPromise: async () => {
		  await new Promise(resolve => {
			const checkElement = () => {
			  const el = document.querySelector('#prof-checkbox-1');
			  if (el) {
				resolve(true);
			  } else {
				setTimeout(checkElement, 100);
			  }
			};
			checkElement();
		  });
		  checkProfessorAdded(2);
		}
	  });
  
	  tour.addStep({
		id: 'select-third-prof',
		text: 'Select your third professor. You can select up to 3 professors to view on your roster.',
		attachTo: {
		  element: '#prof-checkbox-2',
		  on: isMobile ? 'bottom' : 'right'
		},
		beforeShowPromise: async () => {
		  await new Promise(resolve => {
			const checkElement = () => {
			  const el = document.querySelector('#prof-checkbox-2');
			  if (el) {
				resolve(true);
			  } else {
				setTimeout(checkElement, 100);
			  }
			};
			checkElement();
		  });
		  checkProfessorAdded(3);
		}
	  });

	// Additional steps on mobile
	if (isMobile) {
		tour.addStep({
		  id: 'open-menu-step',
		  text: 'Now, tap on the menu icon to open the classes menu.',
		  attachTo: {
			element: '#menu-icon',
			on: 'bottom'
		  },
		  beforeShowPromise: async () => {
			// Wait for the element to be available
			await new Promise(resolve => {
			  const checkElement = () => {
				const el = document.querySelector('#menu-icon');
				if (el) {
				  resolve(true);
				} else {
				  setTimeout(checkElement, 100);
				}
			  };
			  checkElement();
			});
		  },
		  advanceOn: {
			selector: '#menu-icon',
			event: 'click'
		  }
		});
	  }
  
	  // Step to navigate back to home
	  tour.addStep({
		id: 'go-home-step',
		text: 'Click the Home button in the classes menu to review your selections.',
		attachTo: {
		  element: '#home-button',
		  on: isMobile ? 'bottom' : 'right'
		},
		beforeShowPromise: async () => {
		  await new Promise(resolve => {
			const checkElement = () => {
			  const el = document.querySelector('#home-button');
			  if (el) {
				// Waits for home button to be displayed.
				if(isMobile) {
					setTimeout(() => {
						resolve(true);
					}, 500);
				} else {
					resolve(true);
				}
			  } else {
				setTimeout(checkElement, 100);
			  }
			};
			checkElement();
		  });
		},
		advanceOn: {
		  selector: '#home-button',
		  event: 'click'
		}
	  });
  

  
	  // Complete the tour
	  tour.addStep({
		id: 'end-tour',
		text: 'Nice Job! You have completed the tour. Review a summary of your selected professors here and keep exploring with the rest of your courses.',
		buttons: [
		  {
			text: 'Finish',
			action: tour.complete
		  }
		]
	  });
  
	  tour.on('complete', () => {
		localStorage.setItem('tourCompleted', 'true');
	  });
  
	  tour.start();
	};
  
	const skipTour = () => {
	  showTourModal = false;
	  localStorage.setItem('tourCompleted', 'true');
	};
  </script>
  
  <svelte:head>
	<link rel="preconnect" href="https://profiles.utdallas.edu" />
  </svelte:head>
  
  <div class="flex flex-col md:flex-row mx-4 md:mx-6 h-full mb-2">
	<!-- Menu Section -->
	<section
	  class="flex-col md:flex fixed md:static top-0 left-0 bg-base-100 w-full h-full md:w-auto md:h-auto z-10 p-4 md:p-0 transform transition-transform duration-300 ease-in-out -translate-x-full md:translate-x-0"
	  class:translate-x-0={$menu}
	  class:-translate-x-full={!$menu}
	>
	  <div class="mt-14 md:mt-0">
		<div class="card bg-base-300" id="add-class-card">
		  <div class="card-body">
			<h2 class="card-title">Add A Class</h2>
			<label class="label" for="class-input">
			  <span class="label-text">What is the class section and number?</span>
			</label>
			<!-- Input for adding a class -->
			<div class="join">
				<!-- NOTE: A little smaller than w-52 for laptop L compatability -->
			  <input
				id="class-input"
				type="text"
				placeholder="Type here. Ex: SE.3345"
				class="join-item input input-bordered w-full md:w-[12.5rem]" 
				bind:value={className}
				/>
				<!-- Can apply the following props to make the text a little more responsive: flex flex-1 w-0  -->
			  <button class="btn btn-square btn-primary join-item" on:click={addClass}>
				<svg
				  xmlns="http://www.w3.org/2000/svg"
				  class="h-6 w-6"
				  fill="none"
				  viewBox="0 0 24 24"
				  stroke="currentColor"
				>
				  <path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2" 
					d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
				  />
				</svg>
			  </button>
			</div>
			  <!-- <div class="card-actions justify-end">
				<button class="btn btn-primary mt-2">Submit</button>
			  </div> -->
		  </div>
		</div>
		<!-- Courses Card -->
		  <!-- {#if Object.entries($courses[$semester]).filter(obj => obj[1]?.roster).length > 0} -->
		<div class="flex flex-col w-full bg-base-300 card mt-4 pt-2 pr-2">
		  <div class="flex flex-row w-full items-center">
			<h2 class="card-title ml-7 mt-5 w-full">
			  Courses
			</h2>
			<a
			  class="btn btn-square btn-outline btn-sm mt-5 mr-4"
			  class:btn-active={$page.url.pathname === '/app'}
			  style="border: none;"
			  href="/app"
			  rel="prefetch"
			  on:click={() => {
				// Close the menu on mobile when navigating to home
				menu.set(false);
			  }}
			  id="home-button"
			>
			  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6">
				<path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/>
				<path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
			  </svg>
			</a>
		  </div>
		  
		  <div class="flex w-full">
			<ul class="menu p-4 pr-2 w-full">
			  <!-- Iterate over courses and display them -->
			  {#each Object.entries($courses[$semester]).filter(obj => obj[1]?.roster) as [id, course] (id)}
				<li transition:slide>
				  <a
					href={`/app/course/${course.info.subject_prefix}/${course.info.course_number}`}
					class:active={
					  $page.url.pathname === `/app/course/${course.info.subject_prefix}/${course.info.course_number}`
					}
					class="mb-2"
					on:click={() => {
					  // Close the menu on mobile when navigating to a course
					  menu.set(false);
					}}
					rel="prefetch"
				  >
					{`${$courses[$semester][id].info.subject_prefix} ${$courses[$semester][id].info.course_number}`}
				  </a>
				</li>
			  {/each}
				<!-- Additional menu items can be added here -->
				<!-- <li><a class="active">Sidebar Item 1</a></li>
				<li><a>Sidebar Item 2</a></li> -->
			</ul>
			<!-- Buttons for removing classes -->
			<div class="pr-2 py-4 w-14 flex flex-col">
			  {#each Object.entries($courses[$semester]).filter(obj => obj[1]?.roster) as [id, course] (id)}
				<div transition:slide>
				  <button
					class="btn btn-square btn-outline btn-sm mt-[0.2rem] mb-2"
					style="border: none;"
					on:click={() => removeClass(id)}
				  >
					  <svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					  >
						<path
						  stroke-linecap="round"
						  stroke-linejoin="round"
						  stroke-width="2"
						  d="M6 18L18 6M6 6l12 12"
						/>
					  </svg>
				  </button>
				</div>
			  {/each}
			</div>
		  </div>
		</div> 
		  <!-- {/if} -->
	  </div>
	</section>
  
	<!-- Divider -->
	<div class="divider divider-horizontal mr-4 hidden md:flex"></div>
  
	<!-- Main Content Section -->
	<section class="flex flex-col overflow-x-auto w-full">
	  <!-- Slot for main content -->
	  {#if $navigating}
		<div class="w-full h-full flex items-center justify-center">
		  <span class="loading loading-spinner loading-lg mt-16 md:mt-0"></span>
		</div>
	  {:else}
		<slot />
	  {/if}
	  <!-- Example content rendering (commented out) -->
	  <!-- {#if courses[current]}
		<Course info={courses[current].course} />
		{#if courses[current].professors != null}
		  <Professors info={courses[current].professors} />
		{:else}
		  <progress class="progress w-full" />
		{/if}
	  {:else}
  
	  {/if} -->
	</section>
  </div>
  
  {#if showTourModal}
  <!-- Modal -->
  <div class="modal modal-open">
	<div class="modal-box">
	  <h3 class="font-bold text-lg">Welcome to Professor Selector!</h3>
	  <p class="py-4">Would you like to take a quick tour to get started?</p>
	  <div class="modal-action">
		<button class="btn" value="no" on:click={skipTour}>No, thanks</button>
		<button class="btn btn-primary" value="yes" on:click={startTour}>Yes, please</button>
	  </div>
	</div>
  </div>
  {/if}
  
  <style global>
	/* Custom Shepherd.js styling to align with DaisyUI and Tailwind CSS */
	.shepherd-element {
	  @apply bg-base-100 rounded-lg shadow-lg p-4 hidden !important;
	}
	.shepherd-header {
	  @apply text-xl font-bold text-neutral !important;
	}
	.shepherd-text {
	  @apply text-base text-neutral !important;
	}
	.shepherd-button {
	  @apply btn btn-primary !important;
	}
	.shepherd-cancel-icon {
	  @apply text-neutral !important;
	}
  </style>
  