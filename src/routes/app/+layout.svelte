<script>
	import { addToast } from '$lib/toasts';
	import { browser } from '$app/environment';
	import { courses, semester } from '$lib/storage';
	import { redirect } from '@sveltejs/kit';
	import { goto } from '$app/navigation';
    import { page } from '$app/stores';  
	import { getNextSemester } from '$lib/helper';

	import { slide } from "svelte/transition";

	let className = '';
	let current = ''

    const addClass = async () => {
        if(!className) {
            return;
        }
        const classRE = /(\w+)( |\.)(\d+)/g;
		const res = classRE.exec(className);
		if (res) {
            const section = res[1].toUpperCase();
            const number = res[3];
            goto(`/app/course/${section}/${number}${$semester != getNextSemester() ? '?semester=' + $semester : ''}`);
        } else {
			addToast({ type: 'error', text: 'You have entered an invalid class.' });
		}
    }

    const removeClass = (id) => {
		$courses[$semester][id].roster = false;
		$courses = $courses;

		// const ids = Object.keys(courses);
		// if (ids.length <= 1) {
		// 	current = '';
		// } else {
		// 	const pos = ids.indexOf(id);
		// 	current = ids[pos - 1];
		// }
		// delete courses[id];
		// courses.set(courses);
	};


	// const addClass = async () => {
	// 	if (!className) {
	// 		return;
	// 	}
	// 	const classRE = /(\w+)( |\.)(\d+)/g;
	// 	const res = classRE.exec(className);
	// 	if (res) {
	// 		const section = res[1].toUpperCase();
	// 		const number = res[3];

	// 		const found = Object.values(courses).findIndex(
	// 			(course) => course.section == section && course.number == number
	// 		);
	// 		if (found != -1) {
	// 			addToast({ type: 'info', text: 'You have already have this course added.' });
	// 			return;
	// 		}
	// 		try {
	// 			const fres = await fetch(`/api/course/${section}/${number}`);
	// 			if (fres?.status != 200) {
	// 				if(fres?.status == 404) {
	// 					addToast({ type: 'error', text: "The course you entered doesn't exist." });
	// 					return;
	// 				}
	// 				addToast({ type: 'error', text: "Can't get course data. (UTD Nebula might be down)" });
	// 				return;
	// 			}
	// 			const course = await fres.json();
	// 			if (course) {
	// 				const id = course._id;
	// 				$courses[$semester][id].info = course;
	// 				$courses = $courses;

	// 				className = '';
	// 				addToast({ type: 'success', text: 'Added class to list!' });
	// 				if (Object.keys(courses).length == 1) {
	// 					current = id;
	// 				}
	// 				const res3 = await fetch(`/api/professors/${id}`);
	// 				if (res3?.status != 200) {
	// 					if(res3?.status == 404) {
	// 						addToast({ type: 'error', text: "Can't find professor information." });
	// 						return;
	// 					}
	// 					addToast({ type: 'error', text: "Can't get professor information." });
	// 					courses[id].professors = [];
	// 					return;
	// 				}
	// 				const json3 = await res3.json();
	// 				$courses[$semester][id].professors = json3;
	// 				$courses = $courses;
	// 			} else {
	// 				addToast({ type: 'error', text: 'You have entered an invalid class.' });
	// 			}
	// 		} catch (e) {
	// 			addToast({ type: 'error', text: 'Error Accessing Api: Try again later.' });
	// 			console.error(e);
	// 		}
	// 	} else {
	// 		addToast({ type: 'error', text: 'You have entered an invalid class.' });
	// 	}
	// };
	// const removeClass = (id) => {
	// 	const ids = Object.keys(courses);
	// 	if (ids.length <= 1) {
	// 		current = '';
	// 	} else {
	// 		const pos = ids.indexOf(id);
	// 		current = ids[pos - 1];
	// 	}
	// 	delete courses[id];
	// 	courses = courses;
	// };

	// TODO Add a classes header
	// TODO mobile optimization

	if(!Object.hasOwn($courses, $semester)) {
		courses.update(x => {
			return {
				...x,
				[$semester]: {}
			}
		});
	}

</script>

<div class="flex flex-col md:flex-row mx-8 h-full mb-2">
	<section class="flex flex-col">
		<div class="card bg-base-300">
			<div class="card-body">
				<h2 class="card-title">Add A Class</h2>
				<label class="label" for="class-input">
					<span class="label-text">What is the class section and number?</span>
				</label>
				<!-- <input type="text" placeholder="Type here. Ex: SE.3345" class="input input-bordered w-full max-w-xs" /> -->
				<div class="join">
					<input
						id="class-input"
						type="text"
						placeholder="Type here. Ex: SE.3345"
						class="join-item input input-bordered"
						bind:value={className}
					/>
					<button class="btn btn-square btn-primary join-item" on:click={addClass}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							><path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2" 
								d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
							/></svg
						>
					</button>
				</div>
				<!-- <div class="card-actions justify-end">
                    <button class="btn btn-primary mt-2">Submit</button>
                </div> -->
			</div>
		</div>
		<!-- Courses Card -->
		 {#if Object.keys($courses[$semester]).length > 0}
		 <div class="flex flex-col w-full bg-base-300 card mt-4 pt-2">
			<h2 class="card-title ml-7 mt-5">
				Courses
			</h2>
			<div class="flex w-full">
				<ul class="menu p-4 pr-2 w-full">
					<!-- <li class="menu-title">
						<span>Courses</span>
					</li> -->
					{#each Object.entries($courses[$semester]).filter(obj => obj[1]?.roster) as [id, course] (id)}
						<!--  href=`./${c.name}.${c.section}` -->
						<!-- href="/app/class/{id}" -->
							<li>
								<button
									{id}
									class:active={id === current}
									class="mb-2"
									transition:slide
									on:click={() => {current = id; goto(`/app/course/${$courses[$semester][id].info.subject_prefix}/${$courses[$semester][id].info.course_number}`);}}
									>{`${$courses[$semester][id].info.subject_prefix} ${$courses[$semester][id].info.course_number}`}</button>
							</li>
					{/each}
					<!-- <li><a class="active">Sidebar Item 1</a></li>
					<li><a>Sidebar Item 2</a></li> -->
				</ul>
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

									><path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M6 18L18 6M6 6l12 12"
									/></svg
								>
							</button>
						</div>
					{/each}
				</div>
			</div>
		 </div> 
		{/if}
	</section>
	<div class="divider divider-horizontal mr-3" />
	<!-- class="flex-grow" -->
	<section class="flex flex-col overflow-x-auto">
		<!-- Old slot -->
		<slot />
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
