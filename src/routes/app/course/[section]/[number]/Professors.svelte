<script lang='ts'>
	import type { CourseInfoType, ProfInfoType } from "$lib/api/data";
	import { courses, semester } from "$lib/storage";
	import { addToast } from "$lib/toasts";

	export let info: ProfInfoType[];

	export let course: CourseInfoType;


	const sortedMap = {
		Rating: (prof) => prof.rmp.avgRatingRounded,
		Difficulty: (prof) => prof.rmp.avgDifficulty,
		'Would Take Again': (prof) => prof.rmp.wouldTakeAgainPercentRounded,
		'Rating Count': (prof) => prof.rmp.ratingsDistribution.total,
		'Average Grade': (prof) => prof.avgGrade,
	};
	let sortedBy = 'Rating';

	let expanded = info.map(prof => prof._id).reduce((a, v) => ({ ...a, [v]: false}), {}) 

	function expand(profID) {
		expanded[profID] = !expanded[profID];
	}

	$: {
		if(sortedBy != 'Difficulty') {
			info = info.sort((prof1, prof2) => {
				const prof1r = prof1?.rmp?.avgRatingRounded ? Number(sortedMap[sortedBy](prof1)) : -100;
				const prof2r = prof2?.rmp?.avgRatingRounded ? Number(sortedMap[sortedBy](prof2)) : -100;
				return prof2r - prof1r;
			});	
		} else {
			info = info.sort((prof1, prof2) => {
				const prof1r = prof1?.rmp?.avgRatingRounded ? Number(sortedMap[sortedBy](prof1)) : 100;
				const prof2r = prof2?.rmp?.avgRatingRounded ? Number(sortedMap[sortedBy](prof2)) : 100;
				return prof1r - prof2r;
			});
		}
	}

	let selected = {};
	export let selections: string[] = [];
	// console.log($courses, Object.hasOwn($courses, $semester) && Object.hasOwn($courses[$semester], course.subject_prefix + course.course_number) && Object.hasOwn($courses[$semester][course.subject_prefix + course.course_number], "selections"))

	if(Object.hasOwn($courses, $semester) && Object.hasOwn($courses[$semester], course.subject_prefix + course.course_number) && $courses[$semester][course.subject_prefix + course.course_number].selections) {
		selections = $courses[$semester][course.subject_prefix + course.course_number].selections ?? [];  
		for (const id of selections) {
			selected[id] = true;
		}
	}

	
	const change = (id) => {
		if(selected[id] === true) {
			if(selections.length >= 3) {
				addToast({type: 'warning', text: 'You can only select up to three professors, please unselect one before selecting another.'});
				selected[id] = false; 
				return;
			}
			// Add Professor
			// @ts-ignore
			selections = [...selections, id];
			$courses[$semester][course.subject_prefix + course.course_number].selections = selections;
			// $courses = $courses;
			// console.log($courses)
		} else {
			// Remove Professor
			selections = selections.filter(el => el !== id);
			$courses[$semester][course.subject_prefix + course.course_number].selections = selections;
			// $courses = $courses;
		}
		// console.log(selections)
	}
	let checked = false;
	if(Object.hasOwn($courses, $semester) && Object.hasOwn($courses[$semester], course.subject_prefix + course.course_number)) {
		$courses[$semester][course.subject_prefix + course.course_number].professors = info;
		checked = $courses[$semester][course.subject_prefix + course.course_number].roster;
	}


	function toggle() {
		checked = !checked;
		if(checked) {
			$courses[$semester][course.subject_prefix + course.course_number] = {
				info: course,
				professors: info,
				roster: true
			}
		} else {
			$courses[$semester][course.subject_prefix + course.course_number].roster = false;
			$courses = $courses;
		}
	}
</script>

<!-- /* https://medium.com/@chhikaradi/expandable-table-row-css-grid-54f4ff72fb56 */ -->

<style lang="scss">
	// @mixin custom-checkbox($color) {
	// 	--a: #{$color};
	// 	--chkbg: var(--a);
	// 	// --chkfg: var(--ac);
	  
	// 	--tw-border-opacity: 1;
	// 	border-color: hsl(var(--a) / var(--tw-border-opacity));
	  
	// 	&:checked, &[checked=true], &[aria-checked=true] {
	// 	  --tw-border-opacity: 1;
	// 	  border-color: hsl(var(--a) / var(--tw-border-opacity));
	// 	  --tw-bg-opacity: 1;
	// 	  background-color: hsl(var(--a) / var(--tw-bg-opacity));
	// 	  --tw-text-opacity: 1;
	// 	  color: hsl(var(--a) / var(--tw-text-opacity));
	// 	}
	// }
	
	.checkbox-bronze {
		--chkbg: hsl(30, 61%, 50%);
	}
	// @include custom-checkbox(30 61% 50%);

	svg {
		transition: transform 0.3s;
		transform-origin: center center;
	}

  .rotate {
    transform: rotate(45deg);
  }

</style>
<div class="flex flex-row items-center">
	<button
	class="btn btn-circle btn-outline btn-sm mr-3"
	class:btn-primary={checked} class:btn-active={checked}
	on:click={toggle}
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="h6 w6"
			class:rotate={checked}
		>
			<path d="M5 12h14" />
			<path d="M12 5v14" />
		</svg>
	</button>

	<!-- Tabs for medium and larger screens -->
	<div class="tabs tabs-boxed mr-auto inline-block shadow-md bg-base-200 hidden md:block">
		{#each Object.keys(sortedMap) as key}
			<button on:click={() => (sortedBy = key)} class="tab" class:tab-active={sortedBy == key}>
				{key}
			</button>
		{/each}
	</div>

	<!-- Dropdown for small screens -->
	<div id="sort" class="md:hidden flex flex-row bg-base-200 card items-center p-2">
		<label class="w-28 pl-2 font-bold" for="sort">Sort By</label>
		<select bind:value={sortedBy} class="select select-bordered w-full max-w-xs">
			{#each Object.keys(sortedMap) as key}
				<option value={key}>{key}</option>
			{/each}
		</select>
	</div>
</div>
<div class="overflow-x-auto w-full pt-4">
	<table class="table">
		<thead>
			<tr>
				<th></th>
				<th>Professor</th>
				<th>Rating</th>
				<th>Difficulty</th>
				<th>Would Take Again</th>
				<th>Rating Count</th>
				<th>Average Grade</th>
				<th>Links</th>
			  </tr>
		</thead>
		<tbody>
			{#each info as prof}
				<tr>
					<th>
						<label>
							<!-- disabled={selections.length >= 3 && selections.indexOf(prof._id) === -1} -->
							<input type="checkbox" class="checkbox"  class:checkbox-bronze={selections[2] === prof._id} class:checkbox-warning={selections[0] === prof._id} bind:checked={selected[prof._id]}  on:change={() => change(prof._id)}/>
						  </label>
					</th>
					<td>
						<div class="flex items-center space-x-3">
						  <div class="avatar">
							<div class="mask mask-squircle w-12 h-12">
							  <img src={prof.image_uri ? prof.image_uri : 'https://profiles.utdallas.edu/img/default.png'} alt="Profile" />
							</div>
						  </div>
						  <div>
							<div class="font-bold">{prof.first_name} {prof.last_name}</div>
							<div class="text-sm opacity-50">{prof.email}</div>
						  </div>
						</div>
					</td>
					<td class="font-semibold ">
						{prof.rmp?.avgRatingRounded ? Number(prof.rmp.avgRatingRounded).toFixed(1) : '?'}
					</td>
					<td>
						{prof.rmp?.avgDifficulty ? Number(prof.rmp.avgDifficulty).toFixed(1) : '?'}
					</td>
					<td>
						{prof.rmp?.numRatings ? Number(prof.rmp.wouldTakeAgainPercentRounded).toFixed(0) : '?'}%
					</td>
					<td>
						{prof.rmp?.ratingsDistribution?.total ? prof.rmp.ratingsDistribution.total : '?'}
					</td>
					<td>
						{prof.avgGrade ? Number(prof.avgGrade).toFixed(1) : '?'}%
					</td>
					<td>
						<div class="join lg:btn-group-horizontal">
							<a href="https://www.ratemyprofessors.com/professor/{prof.rmp.legacyId}" target="_blank" rel="noopener noreferrer" class="btn btn-xs join-item">Ratings</a>
							<a href="https://utdgrades.com/results?search={(prof?.first_name + '+' + prof?.last_name)?.replaceAll(' ','+')}" target="_blank" rel="noopener noreferrer" class="btn btn-xs join-item">Grades</a>
						</div>
					</td>
				</tr>
			{/each}
		</tbody>
		<!-- foot -->
		<tfoot>
			<tr>
				<th></th>
				<th></th>
				<th>/ 5</th>
				<th>/ 5</th>
				<th>/ 100</th>
				<th>users</th>
				<th>/ 100</th>
				<th></th>
			</tr>
		</tfoot>
	</table>
</div>
