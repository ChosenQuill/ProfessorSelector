<script lang='ts'>
	import type { PageData } from "./$types";
	import Course from "./Course.svelte";
    import Professors from "./Professors.svelte";
    import { semester, courses } from "$lib/storage";
	import type { ProfInfoType } from "$lib/api/data";

    export let data: PageData;
    $: course = data.course;

    // Checks to see if the course is already persisted. If its not, creates a new entry with the info and the roster.
    if(Object.hasOwn($courses, $semester) && !Object.hasOwn($courses[$semester], data.course.subject_prefix + data.course.course_number)) {
        $courses[$semester][data.course.subject_prefix + data.course.course_number] = {
            info: data.course,
            roster: false
        }
        $courses = $courses;
    }
    
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