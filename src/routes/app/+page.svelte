<script>
  import { courses, semester } from "$lib/storage";
  import RosterCard from "./RosterCard.svelte";

  // Log courses with selections for debugging
  console.log(
    Object.entries($courses[$semester]).filter(
      ([, course]) => course.selections && course.selections.length > 0
    )
  );
  
  const selectedProfs = Object.entries($courses[$semester] || {})
    .filter(
      ([, course]) =>
        course.roster &&
        course.professors &&
        course.professors.length > 0 &&
        course.selections &&
        course.selections.length > 0
    )
    .flatMap(([courseId, course]) =>
      course.selections
        .map((selectionId) =>
          course.professors.find((prof) => prof._id === selectionId)
        )
        .filter((prof) => prof !== undefined) // Remove undefined values
    );

  // Calculate the average RMP rating
  const rmpAvg =
    selectedProfs.length > 0
      ? selectedProfs.reduce(
          (acc, currentProf) =>
            acc + currentProf?.rmp?.avgRatingRounded,
          0
        ) / selectedProfs.length
      : 0;

  const wtaAvg =
    selectedProfs.length > 0
      ? selectedProfs.reduce(
          (acc, currentProf) =>
            acc + currentProf?.rmp?.wouldTakeAgainPercentRounded,
          0
        ) / selectedProfs.length
      : 0;

  const gradeAvg =
    selectedProfs.length > 0
      ? selectedProfs.reduce(
          (acc, currentProf) =>
            acc + currentProf?.avgGrade,
          0
        ) / selectedProfs.length
      : 0;
  
  console.log("Average RMP Rating:", rmpAvg, gradeAvg);
</script>


{#if Object.entries($courses[$semester]).filter(obj => obj[1].roster && obj[1].selections && obj[1].selections.length > 0).length > 0}
<!-- <h1 class="card-title text-4xl font-bold mb-2">
    Roster
</h1> -->

<div class="card bg-base-200 flex-row p-3 justify-center md:justify-between mb-4">
  <h1 class="card-title text-5xl font-bold mb-2 py-4 pl-0 md:pl-10">
      Roster
  </h1>
  <div class="stats hidden md:inline-grid ml-12">
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
        <div class="stat-value">{Object.entries($courses[$semester]).filter(obj => obj[1].roster).length}</div>
        <div class="stat-desc">courses added</div>
      </div>
      <!-- <div class="stat">
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
        <div class="stat-title">Professors</div>
        <div class="stat-value">{selectedProfs.length}</div>
        <div class="stat-desc">selected</div>
      </div> -->
      <div class="stat">
        <div class="stat-figure text-secondary">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="inline-block h-8 w-8 stroke-current"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
        </div>
        <div class="stat-title">Average Rating</div>
        <div class="stat-value">{rmpAvg.toFixed(1)}</div>
        <div class="stat-desc">out of 5</div>
      </div>
    
      <div class="stat">
        <div class="stat-figure text-secondary">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="inline-block h-8 w-8 stroke-current"><path d="M7 10v12"/><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z"/></svg>
        </div>
        <div class="stat-title">Average WTA</div>
        <div class="stat-value">{wtaAvg.toFixed(0)}%</div>
        <div class="stat-desc">would take again</div>
      </div>
      <div class="stat">
        <div class="stat-figure text-secondary">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="inline-block h-8 w-8 stroke-current"><path d="M12 7v6"/><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"/><path d="M9 10h6"/></svg>
          <!-- <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="inline-block h-8 w-8 stroke-current"><path d="M9 5v4"/><rect width="4" height="6" x="7" y="9" rx="1"/><path d="M9 15v2"/><path d="M17 3v2"/><rect width="4" height="8" x="15" y="5" rx="1"/><path d="M17 13v3"/><path d="M3 3v16a2 2 0 0 0 2 2h16"/></svg> -->
        </div>
        <div class="stat-title">Average Grades</div>
        <div class="stat-value">{gradeAvg.toFixed(0)}</div>
        <div class="stat-desc">out of 100</div>
      </div>
    </div>
</div>

<div class="grid grid-cols-1 gap-2 lg:grid-cols-2">
    <RosterCard position={0} color="gold" />
    <RosterCard position={1} color="silver" />
    <RosterCard position={2} color="bronze" />
</div>
{:else if Object.entries($courses[$semester]).filter(obj => obj[1].roster).length === 0}
    <h1 class="text-3xl font-bold">No Courses Added</h1>
    <p class="my-2">Please add a class and select more than one professor to view your current roster.</p>
{:else}
  <h1 class="text-3xl font-bold">No Professors Selected</h1>
  <p class="my-2">Please select at least one professor from one of your classes to view your roster.</p>

{/if}