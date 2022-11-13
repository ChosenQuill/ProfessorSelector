<script>
    import headers from "$lib/headers.js"
    import { goto } from '$app/navigation';
    import toasts from "$lib/toasts.js"
    import { page } from '$app/stores';
    console.log("URL", $page.url.pathname)  

    let className = "";
    let classes = []

    const addClass = async () => {
        if(!className) {
            return;
        }
        const classRE = /(\w+)( |\.)(\d+)/g
        const res = classRE.exec(className)
        if(res) {
            const section = res[1].toUpperCase();
            const number = res[3];
            try {
                const fres = await fetch(`https://api.utdnebula.com/course?subject_prefix=${section}&course_number=${number}`, headers);
                const json = await fres.json();
                console.log(json)
                if(json.data) {
                    const id = json.data[0]._id;
                    classes = [...classes, {section, number, id}];
                    className = ""
                    $toasts.push({type: "success", text: "Added class to list!"})
                    $toasts = $toasts
                    console.log("Classes",classes)
                    if(classes.length == 1) {
                        goto(`/app/class/${id}`);
                    }
                } else {
                    $toasts.push({type: "error", text: "You have entered an invalid class."})
                    $toasts = $toasts
                }
            } catch (e) {
                $toasts.push({type: "error", text: "Error Accessing Api: Try again later."})
                $toasts = $toasts
            }
            
        } else {
            $toasts.push({type: "error", text: "You have entered an invalid class."})
            $toasts = $toasts
        }
    }
</script>

<div class="flex flex-row mx-8 h-full">
    <section class="flex flex-col">
        <div class="card bg-neutral shadow-xl">
            <div class="card-body">
                <h2 class="card-title">Add A Class</h2>
                <label class="label">
                    <span class="label-text">What is the class section and number?</span>
                </label>
                <!-- <input type="text" placeholder="Type here. Ex: SE.3345" class="input input-bordered w-full max-w-xs" /> -->
                <div class="input-group">
                    <input type="text" placeholder="Type here. Ex: SE.3345" class="input input-bordered" bind:value={className}/>
                    <button class="btn btn-square btn-primary" on:click={addClass}>
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    </button>
                </div>
                <!-- <div class="card-actions justify-end">
                    <button class="btn btn-primary mt-2">Submit</button>
                </div> -->
            </div>
          </div>

          <ul class="menu p-4 w-full mt-2 text-base-content">
            {#each classes as {id, section, number} (id)}
            <!--  href=`./${c.name}.${c.section}` -->
                <li><a id={id} href="/app/class/{id}" class:active={$page.url.pathname.includes(id)} class="mb-2">{`${section} ${number}`}</a></li>
            {/each}
            <!-- <li><a class="active">Sidebar Item 1</a></li>
            <li><a>Sidebar Item 2</a></li> -->
          </ul>

    </section>
    <div class="divider divider-horizontal mr-3"></div>
    <!-- class="flex-grow" -->
    <section >
        <slot />
    </section>
</div>