<script>
	import { toasts } from '$lib/stores.js';
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	// console.log("URL", $page.url.pathname)
	import Course from './Course.svelte';
	import Professors from './Professors.svelte';

	let className = '';
	let courses = browser ? JSON.parse(window.localStorage.getItem('courses') || '{}') : {};
	let current = browser ? window.localStorage.getItem('current') || '' : '';

	$: {
		if (browser) {
			window.localStorage.setItem('courses', JSON.stringify(courses));
		}
	}

	$: {
		if (browser) {
			window.localStorage.setItem('current', current);
		}
	}

	const addClass = async () => {
		if (!className) {
			return;
		}
		const classRE = /(\w+)( |\.)(\d+)/g;
		const res = classRE.exec(className);
		if (res) {
			const section = res[1].toUpperCase();
			const number = res[3];

			const found = Object.values(courses).findIndex(
				(course) => course.section == section && course.number == number
			);
			if (found != -1) {
				$toasts.push({ type: 'info', text: 'You have already have this course added.' });
				$toasts = $toasts;
				return;
			}
			try {
				const fres = await fetch(`/api/course/${section}/${number}`);
				if (fres?.status != 200) {
					$toasts.push({ type: 'error', text: "Can't access UTD nebula's api." });
					$toasts = $toasts;
					return;
				}
				const course = await fres.json();
				if (course) {
					const id = course._id;
					courses[id] = { section, number, id, course, professors: [] };
					courses = courses;

					className = '';
					$toasts.push({ type: 'success', text: 'Added class to list!' });
					$toasts = $toasts;

					if (Object.keys(courses).length == 1) {
						current = id;
					}
					const res3 = await fetch(`/api/professors/${id}`);
					if (fres?.status != 200) {
						$toasts.push({ type: 'error', text: "Can't access UTD Grade's api." });
						$toasts = $toasts;
						return;
					}
					const json3 = await res3.json();
					courses[id].professors = json3;
					courses = courses;
				} else {
					$toasts.push({ type: 'error', text: 'You have entered an invalid class.' });
					$toasts = $toasts;
				}
			} catch (e) {
				$toasts.push({ type: 'error', text: 'Error Accessing Api: Try again later.' });
				$toasts = $toasts;
				console.error(e);
			}
		} else {
			$toasts.push({ type: 'error', text: 'You have entered an invalid class.' });
			$toasts = $toasts;
		}
	};
	const removeClass = (id) => {
		const ids = Object.keys(courses);
		if (ids.length <= 1) {
			current = '';
		} else {
			const pos = ids.indexOf(id);
			current = ids[pos - 1];
		}
		delete courses[id];
		courses = courses;
	};
</script>

<div class="flex flex-row mx-8 h-full">
	<section class="flex flex-col">
		<div class="card bg-base-300 shadow-md">
			<div class="card-body">
				<h2 class="card-title">Add A Class</h2>
				<label class="label">
					<span class="label-text">What is the class section and number?</span>
				</label>
				<!-- <input type="text" placeholder="Type here. Ex: SE.3345" class="input input-bordered w-full max-w-xs" /> -->
				<div class="input-group">
					<input
						type="text"
						placeholder="Type here. Ex: SE.3345"
						class="input input-bordered"
						bind:value={className}
					/>
					<button class="btn btn-square btn-primary" on:click={addClass}>
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
		<div class="flex flex-row w-full">
			<ul class="menu p-4 pr-2 w-full mt-2">
				<!-- <li class="menu-title">
                    <span>Courses</span>
                  </li> -->
				{#each Object.keys(courses) as id (id)}
					<!--  href=`./${c.name}.${c.section}` -->
					<li>
						<button
							{id}
							href="/app/class/{id}"
							class:active={id === current}
							class="mb-2"
							on:click={() => (current = id)}
							>{`${courses[id].section} ${courses[id].number}`}</button
						>
					</li>
				{/each}
				<!-- <li><a class="active">Sidebar Item 1</a></li>
                <li><a>Sidebar Item 2</a></li> -->
			</ul>
			<div class="mt-2 pr-2 py-4 w-14 flex flex-col">
				{#each Object.keys(courses) as id (id)}
					<button
						class="btn btn-square btn-outline mb-2"
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
				{/each}
			</div>
		</div>
	</section>
	<div class="divider divider-horizontal mr-3" />
	<!-- class="flex-grow" -->
	<section class="flex flex-col overflow-x-auto">
		<!-- Old slot -->
		{#if courses[current]}
			<Course info={courses[current].course} />
			{#if courses[current].professors.length != 0}
				<Professors info={courses[current].professors} />
			{:else}
				<progress class="progress w-full" />
			{/if}
		{:else}
			<h1 class="text-3xl font-bold">No Class Selected</h1>
			<p class="my-2">Please add a class to continue.</p>
		{/if}
	</section>
</div>
