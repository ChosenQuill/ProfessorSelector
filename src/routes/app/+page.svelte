<script>
    import { courses, semester } from "$lib/storage";
	import RosterCard from "./RosterCard.svelte";
    console.log($courses[$semester])
    console.log(Object.entries($courses[$semester]).filter(obj => obj[1].selections && obj[1].selections.length > 0).length > 0)
</script>


{#if Object.entries($courses[$semester]).filter(obj => obj[1].roster && obj[1].selections && obj[1].selections.length > 0).length > 0}
<!-- <h1 class="card-title text-4xl font-bold mb-2">
    Roster
</h1> -->
<div class="grid grid-cols-1 gap-2 lg:grid-cols-2">
    <div class="bg-base-200 card ">
        <div class="card-body">
            <h1 class="card-title text-4xl font-bold mb-2">
                Roster
            </h1>
            <div class="stats">
                <div class="stat">
                  <div class="stat-figure text-secondary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      class="inline-block h-8 w-8 stroke-current">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <div class="stat-title">Classes</div>
                  <div class="stat-value">{Object.entries($courses[$semester]).length}</div>
                  <div class="stat-desc">classes added</div>
                </div>
                <!-- TODO: ADD MORE PROPER METRICS -->
                <div class="stat">
                  <div class="stat-figure text-secondary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      class="inline-block h-8 w-8 stroke-current">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
                    </svg>
                  </div>
                  <div class="stat-title">New Users</div>
                  <div class="stat-value">4,200</div>
                  <div class="stat-desc">↗︎ 400 (22%)</div>
                </div>
              
                <div class="stat">
                  <div class="stat-figure text-secondary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      class="inline-block h-8 w-8 stroke-current">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path>
                    </svg>
                  </div>
                  <div class="stat-title">New Registers</div>
                  <div class="stat-value">1,200</div>
                  <div class="stat-desc">↘︎ 90 (14%)</div>
                </div>
              </div>
        </div>
    </div>
    
    <RosterCard number={0} color="gold" />
    <RosterCard number={1} color="silver" />
    <RosterCard number={2} color="bronze" />
    
</div>
{:else}
    <h1 class="text-3xl font-bold">No Courses Added</h1>
    <p class="my-2">Please add a class and select more than one professor to view your current roster.</p>
{/if}