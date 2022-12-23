<script>
	export let info;

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
		console.log(info)
	}
</script>

<style>
	.expanded {
		transform: rotate(180deg);
	}

	tr:nth-child(odd) > td, tr:nth-child(odd) > th {
		border: none;
	}

	/* tr {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
	}

	.hide-row {
		display: none;
	} */
	/* https://medium.com/@chhikaradi/expandable-table-row-css-grid-54f4ff72fb56 */
</style>

<div class="tabs tabs-boxed mr-auto inline-block shadow-md bg-base-200">
	{#each Object.keys(sortedMap) as key}
		<button on:click={() => (sortedBy = key)} class="tab" class:tab-active={sortedBy == key}>
			{key}
		</button>
	{/each}
</div>
<div class="overflow-x-auto w-full pt-4">
	<table class="table">
		<thead>
			<tr>
				<th>
				  <label>
					<input type="checkbox" class="checkbox" />
				  </label>
				</th>
				<th>Professor</th>
				<th>Rating</th>
				<th>Difficulty</th>
				<th>Would Take Again</th>
				<th>Rating Count</th>
				<th>Average Grade</th>
				<th>Links</th>
				<th></th>
			  </tr>
		</thead>
		<tbody>
			{#each info as prof}
				<tr>
					<th>
						<label>
							<input type="checkbox" class="checkbox" />
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
							<div class="font-bold">{prof.full_name}</div>
							<div class="text-sm opacity-50">{prof.email}</div>
						  </div>
						</div>
					</td>
					<td class="font-semibold">
						{prof.rmp.avgRatingRounded ? Number(prof.rmp.avgRatingRounded).toFixed(1) : '?'}
					</td>
					<td>
						{prof.rmp.avgDifficulty ? Number(prof.rmp.avgDifficulty).toFixed(1) : '?'}
					</td>
					<td>
						{prof.rmp.numRatings ? Number(prof.rmp.wouldTakeAgainPercentRounded).toFixed(0) : '?'}%
					</td>
					<td>
						{prof.rmp?.ratingsDistribution?.total ? prof.rmp.ratingsDistribution.total : '?'}
					</td>
					<td>
						{prof.avgGrade ? Number(prof.avgGrade).toFixed(1) : '?'}%
					</td>
					<td>
						<div class="btn-group lg:btn-group-horizontal">
							<button class="btn btn-xs">Button</button>
							<button class="btn btn-xs">Button</button>
							<button class="btn btn-xs">Button</button>
						</div>
					</td>
					<td>
						<button class="btn btn-ghost btn-sm" on:click={()=>expand(prof._id)}>
							<div class="transition-transform" class:expanded={expanded[prof._id] === true}>
								<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 48 48" stroke="currentColor" fill="currentColor" >
									<path d="M24 30.15q-.3 0-.55-.1-.25-.1-.5-.35l-9.9-9.9q-.4-.4-.375-1.075.025-.675.425-1.075.5-.5 1.075-.425.575.075 1.025.475l8.8 8.8 8.8-8.8q.4-.4 1.075-.45.675-.05 1.075.45.5.4.425 1.05-.075.65-.475 1.1l-9.85 9.85q-.25.25-.5.35-.25.1-.55.1Z"/>
								</svg>
								<!-- <span class="material-symbols-rounded">
									expand_more
								</span> -->
							</div>
						</button>
					</td>
				</tr>
				<tr>
					<!-- <td colspan="9" class="{expanded[prof._id] ? "visible" : "hidden"} border-none">
						<div>
							Testing Stuff
						</div>
					</td> -->

					<td colspan="9" class="transition-all py-0">
						<div class="{expanded[prof._id] ? "max-h-14 py-4 pt-2" : "max-h-0 py-0  overflow-hidden"} box-border transition-all">
							Hi! Here will be some more data about the professor. Stay tuned!
						</div>
					</td>
					
					<!-- <td colspan="9" class="border-none transition-all py-0 overflow-hidden">
						<div class="{expanded[prof._id] ? "py-4 scale-y-100" : "py-0 scale-y-0"} overflow-hidden transition-all box-border">
							Testing Stuff <br /> line 2
						</div>
					</td> -->
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
				<th></th>
			</tr>
		</tfoot>
	</table>
</div>

<!--
	{#each info as prof}
		<div class="collapse collapse-arrow border border-base-300 bg-base-200 rounded-box my-4 w-full">
			<input type="checkbox" />
			<div class="collapse-title text-xl flex flex-row w-full">
				<span class="font-medium flex-grow">
					{prof.full_name}
				</span>
				<a
					target="_blank"
					href={prof.rmp.legacyId
						? `https://www.ratemyprofessors.com/professor?tid=${prof.rmp.legacyId}`
						: `https://www.ratemyprofessors.com/search/teachers?query=${prof.full_name}`}
					class="z-40 flex justify-center items-center ml-4"
				>
					<span style="font-size: 20px;" class="material-symbols-rounded">link</span>
				</a>
			</div>
			<div class="collapse-content">
				<div class="stats -ml-2 mt-0 bg-base-200">
					<div class="stat">
						<div class="avatar">
							<div class="w-24 rounded-xl">
								<img
									src={prof.image_uri
										? prof.image_uri
										: 'https://profiles.utdallas.edu/img/default.png'}
								/>
							</div>
						</div>
					</div>
	
					<div class="stat">
						<div class="stat-figure text-primary">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								class="inline-block w-8 h-8 stroke-current"
								><path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
								/></svg
							>
						</div>
						<div class="stat-title">Rating</div>
						<div class="stat-value text-primary">
							{prof.rmp.avgRatingRounded ? Number(prof.rmp.avgRatingRounded).toFixed(1) : '?'}
						</div>
						<div class="stat-desc">Out Of 5</div>
					</div>
	
					<div class="stat">
						<div class="stat-figure text-secondary">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								class="inline-block w-8 h-8 stroke-current"
								><path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M13 10V3L4 14h7v7l9-11h-7z"
								/></svg
							>
						</div>
						<div class="stat-title">Difficulty</div>
						<div class="stat-value text-secondary">
							{prof.rmp.avgDifficulty ? Number(prof.rmp.avgDifficulty).toFixed(1) : '?'}
						</div>
						<div class="stat-desc">Out Of 5</div>
					</div>
	
					<div class="stat">
						<div class="stat-figure">
							<span class="material-symbols-rounded" style="font-size: 34px;">refresh</span>
						</div>
						<div class="stat-value">
							{prof.rmp.numRatings ? Number(prof.rmp.wouldTakeAgainPercentRounded).toFixed(0) : '?'}%
						</div>
						<div class="stat-title">Would Take Again</div>
						<div class="stat-desc text-secondary">
							out of {prof.rmp?.ratingsDistribution?.total ? prof.rmp.ratingsDistribution.total : '?'} users
						</div>
					</div>
	
					<div class="stat">
						<div class="stat-figure">
							<span class="material-symbols-rounded" style="font-size: 34px;">grade</span>
						</div>
						<div class="stat-title">Average Grade</div>
						<div class="stat-value">{prof.avgGrade ? Number(prof.avgGrade).toFixed(1) : '?'}</div>
						<div class="stat-desc">Out Of 100</div>
					</div>
				</div>
			</div>
		</div>
	{/each}
-->
