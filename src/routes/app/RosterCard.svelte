<script lang="ts">
    import { courses, semester } from "$lib/storage";
    
    export let position: number;
    export let color: string;

    // This refresh is need because profile images would be incorrectly set without it, bug with svelte state
    $courses = $courses
</script>
{#if Object.entries($courses[$semester]).filter((obj) => obj[1]?.roster && obj[1]?.professors && obj[1]?.professors.length && obj[1]?.selections && obj[1]?.selections.length > position).length > 0}

    <!-- This snippet is needed to allow tailwind to incorperate all classes into final css file -->
    <div class="hidden outline-gold outline-silver outline-bronze"></div>

    <div class="bg-base-200  outline outline-2 outline-offset-2 outline-{color} card m-2">
        <div class="card-body p-4 md:p-6">

            <div class="overflow-x-auto">
                <table class="table">
                <!-- head -->
                <thead>
                    <tr>
                        <th>Course</th>
                        <!-- <th>Name</th> -->
                        <th>Professor</th>
                        <th>Rating</th>    
                    </tr>
                </thead>
                <tbody>
                    {#each Object.entries($courses[$semester]).filter((obj) => obj[1]?.roster && obj[1]?.professors && obj[1]?.professors.length && obj[1]?.selections && obj[1]?.selections.length > position).map((obj) =>{ 
                        obj[1].professor = obj[1].professors.find(prof => prof._id == obj[1].selections[position]);
                        console.log(obj[1])
                        return obj;
                        }) as [id, course] (course.info._id) }
                    <tr>
                        <th>{course.info.subject_prefix}<br />{course.info.course_number}</th>
                        <!-- <td>{course.info.title}</td> -->
                        <td>
                            <div class="flex items-center space-x-3">
                            <div class="avatar">
                                <div class="mask mask-squircle w-12 h-12">
                                <img src={course?.professor?.image_uri ? course.professor.image_uri : 'https://profiles.utdallas.edu/img/default.png'} alt="Profile" />
                                </div>
                            </div>
                            <div>
                                <div class="font-bold">{course?.professor?.first_name} {course?.professor?.last_name}</div>
                                <div class="text-sm opacity-50">{course?.professor?.email}</div>
                            </div>
                            </div>
                        </td>
                        <td class="md:w-24">
                            <span class="text-xl font-bold">
                                {Number(course?.professor?.rmp?.avgRatingRounded).toFixed(1)}
                            </span>
                            <span class="text-md">/ 5</span>
                        </td>
                    {/each}
                </tbody>
                </table>
            </div>
        </div>
    </div>
{/if}