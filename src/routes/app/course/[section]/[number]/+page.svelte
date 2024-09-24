<script lang='ts'>
	import type { PageData } from "./$types";
	import Course from "./Course.svelte";
    import Professors from "./Professors.svelte";
    import { semester, courses } from "$lib/storage";
	import type { ProfInfoType } from "$lib/api/data";

    export let data: PageData;
    $: course = data.course;

    $courses[$semester][data.course.subject_prefix + data.course.course_number] = {
        info: data.course,
        roster: true
    }
    $courses = $courses;
    
</script>

<Course info={course} />

{#await data.professors}
    <progress class="progress w-full" />
{:then professors}
    {#if professors}
        <Professors course={course} info={professors} />
    {:else}
        Professor Data Not Found
    {/if}
{/await}