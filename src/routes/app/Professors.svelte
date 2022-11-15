<script>
    export let info;
    console.log(info)
</script>

{#each info as prof}
<div class="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box my-4 w-full">
    <input type="checkbox" /> 
    <div class="collapse-title text-xl flex flex-row w-full">
        <span class="font-medium flex-grow">
            {prof.full_name}
        </span>
        <a target="_blank" href={prof.rmp.legacyId ? `https://www.ratemyprofessors.com/professor?tid=${prof.rmp.legacyId}` : `https://www.ratemyprofessors.com/search/teachers?query=${prof.full_name}`} class="z-40 flex justify-center items-center ml-4">
          <span style="font-size: 20px;" class="material-icons">link</span>
        </a>
    </div>
    <div class="collapse-content"> 
        <div class="stats -ml-2 mt-0">
            <div class="stat">
              <div class="avatar">
                <div class="w-24 rounded-xl">
                  <img src={prof.image_uri ? prof.image_uri : "https://profiles.utdallas.edu/img/default.png"} />
                </div>
              </div>
            </div>

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
                <span class="material-icons" style="font-size: 34px;">refresh</span>
                <!-- <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg> -->
              </div>
              <div class="stat-value">{Number(prof.rmp.wouldTakeAgainPercentRounded).toFixed(0)}%</div>
              <div class="stat-title">Would Take Again</div>
              <div class="stat-desc text-secondary">out of {prof.rmp.numRatings} users</div>
          
            </div>
            
            <div class="stat">
              <div class="stat-figure">
                <span class="material-icons-outlined" style="font-size: 34px;">grade</span>
              </div>
              <div class="stat-title">Average Grade</div>
              <div class="stat-value">{Number(Math.random() * 20 + 80).toFixed(1)}</div>
              <div class="stat-desc">Out Of 100</div>
            </div>
        </div>
        <!-- <div class="rating rating-md rating-half mt-4">
          <div class="text-lg">Your Rating:</div>
          <input type="radio" name="rating-10" class="rating-hidden" />
          <input type="radio" name="rating-10" class="bg-green-500 mask mask-star-2 mask-half-1" />
          <input type="radio" name="rating-10" class="bg-green-500 mask mask-star-2 mask-half-2" />
          <input type="radio" name="rating-10" class="bg-green-500 mask mask-star-2 mask-half-1" checked />
          <input type="radio" name="rating-10" class="bg-green-500 mask mask-star-2 mask-half-2" />
          <input type="radio" name="rating-10" class="bg-green-500 mask mask-star-2 mask-half-1" />
          <input type="radio" name="rating-10" class="bg-green-500 mask mask-star-2 mask-half-2" />
          <input type="radio" name="rating-10" class="bg-green-500 mask mask-star-2 mask-half-1" />
          <input type="radio" name="rating-10" class="bg-green-500 mask mask-star-2 mask-half-2" />
          <input type="radio" name="rating-10" class="bg-green-500 mask mask-star-2 mask-half-1" />
          <input type="radio" name="rating-10" class="bg-green-500 mask mask-star-2 mask-half-2" />
        </div> -->
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
