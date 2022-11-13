<script>
    export let data;
    $: professors = data.professors;
    $: course = data.course;
    let desc;
    $: {
        const re = /(.+)\) (.+) Prerequisites:.+/g
        const res = re.exec(course.description);
        desc = res ? res[2] : course.description;
    }
</script>

<h3 class="text-2xl font-bold">{course.title}</h3>
<p class="my-2"> {desc} </p>
{#each professors as prof}
<div class="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box my-4 w-full">
    <input type="checkbox" /> 
    <div class="collapse-title text-xl">
        <span class="font-medium">
            {prof.full_name}
        </span>
    </div>
    <div class="collapse-content"> 
        <div class="stats">
          {#if prof.image_uri}
          <div class="stat">
            <div class="avatar">
              <div class="w-24 rounded-xl">
                <img src={prof.image_uri} />
              </div>
            </div>
          </div>
          {/if}

          <div class="stat">
            <div class="stat-figure text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
            </div>
            <div class="stat-title">Rating</div>
            <div class="stat-value text-primary">{Number(prof.rmp.avgRatingRounded).toFixed(1)}</div>
            <div class="stat-desc">Out Of 5</div>
          </div>
          
          <div class="stat">
            <div class="stat-figure text-secondary">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
            </div>
            <div class="stat-title">Difficulty</div>
            <div class="stat-value text-secondary">{Number(prof.rmp.avgDifficulty).toFixed(1)}</div>
            <div class="stat-desc">Out Of 5</div>
          </div>
          
          <div class="stat">
              <div class="stat-figure">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              </div>
              <div class="stat-value">{Number(prof.rmp.wouldTakeAgainPercentRounded).toFixed(0)}%</div>
              <div class="stat-title">Would Take Again</div>
              <div class="stat-desc text-secondary">out of {prof.rmp.numRatings} users</div>
          
            </div>
            
        </div>
    </div>
  </div>          
{/each}
<!-- {#if data}
    <h3 class="text-2xl font-bold">Classes</h3>
    <Professor />
{:else}
    <h3 class="text-2xl font-bold">Loading...</h3>
{/if} -->
<!-- <Class name="Data Structures and Introduction to Algorithmic Analysis" short="SE 3345" /> -->
