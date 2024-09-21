<script lang='ts'>
	import type { PageData } from "./$types";
	import Course from "./Course.svelte";
    import Professors from "./Professors.svelte";
    import { semester, courses } from "$lib/storage";

    export let data: PageData;
    $: course = data.course;

    (async () => {
        const profs = await data.professors;

        // $courses[$semester][data.course.name + ]
        console.log(course)
        console.log(profs)
    })()
</script>

<Course info={course} />

{#await data.professors}
    <progress class="progress w-full" />
{:then professors}
    {#if professors}
        <Professors info={professors} />
    {:else}
        Professor Data Not Found
    {/if}

{/await}