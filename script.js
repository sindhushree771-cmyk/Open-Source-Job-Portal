const seedJobs = [
{id:1,title:"Frontend Developer",company:"Bright Labs",location:"Bengaluru / Hybrid",type:"Full-time",salary:"₹5–8 LPA",deadline:"2026-12-15",description:"Build accessible, responsive web experiences with HTML, CSS, and JavaScript."},
{id:2,title:"Software Engineering Intern",company:"NovaTech",location:"Remote",type:"Internship",salary:"₹15,000 / month",deadline:"2026-11-30",description:"Work with engineers on real product features and learn modern development practices."},
{id:3,title:"UI/UX Design Assistant",company:"Pixel & Co.",location:"Mysuru",type:"Part-time",salary:"₹18,000 / month",deadline:"2026-12-05",description:"Help create clear user journeys, wireframes, and thoughtful interface designs."},
{id:4,title:"Junior Python Developer",company:"DataNest",location:"Remote",type:"Full-time",salary:"₹4–6 LPA",deadline:"2026-12-20",description:"Write readable Python code and support automation and data projects."},
{id:5,title:"Digital Marketing Intern",company:"Goodwave Studio",location:"Bengaluru",type:"Internship",salary:"₹12,000 / month",deadline:"2026-11-25",description:"Support social media campaigns, content planning, and campaign reports."},
{id:6,title:"Customer Support Associate",company:"CloudSpring",location:"Hassan",type:"Full-time",salary:"₹3–4 LPA",deadline:"2026-12-10",description:"Help customers solve product questions with friendly communication."},
{id:7,title:"Content Writing Intern",company:"Paperplane Media",location:"Remote",type:"Internship",salary:"₹10,000 / month",deadline:"2026-11-28",description:"Research and write useful articles, product copy, and short-form content."},
{id:8,title:"QA Tester",company:"QualityLoop",location:"Mangaluru",type:"Part-time",salary:"₹20,000 / month",deadline:"2026-12-12",description:"Test web app features, record issues, and help improve product quality."}
];
let jobs=[...seedJobs], applications=[], nextId=9;
const $=id=>document.getElementById(id);
const safe=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
function renderJobs(list=jobs){
 $("jobList").innerHTML=list.map(j=>`<article class="job"><div class="jobtop"><div class="logo">${safe(j.company.charAt(0))}</div><span class="tag">${safe(j.type)}</span></div><h3>${safe(j.title)}</h3><div class="company">${safe(j.company)}</div><div class="meta">⌖ ${safe(j.location)}<br>Deadline: ${safe(j.deadline)}</div><p class="desc">${safe(j.description)}</p><div class="jobbottom"><span>${safe(j.salary||"Salary not specified")}</span><button data-apply="${j.id}">Apply →</button></div></article>`).join("");
 $("resultsCount").textContent=`Showing ${list.length} of ${jobs.length} jobs`;
 $("heroCount").textContent=jobs.length; $("noResults").hidden=list.length>0;
}
function searchJobs(){
 const q=$("searchInput").value.trim().toLowerCase(), loc=$("locationInput").value.trim().toLowerCase(), type=$("typeFilter").value;
 renderJobs(jobs.filter(j=>(j.title+" "+j.company+" "+j.description).toLowerCase().includes(q)&&j.location.toLowerCase().includes(loc)&&(type==="All"||j.type===type)));
}
["searchInput","locationInput"].forEach(id=>$(id).addEventListener("input",searchJobs));
$("typeFilter").addEventListener("change",searchJobs);$("searchButton").addEventListener("click",searchJobs);
$("jobForm").addEventListener("submit",e=>{
 e.preventDefault();jobs.unshift({id:nextId++,title:$("jobTitle").value.trim(),company:$("company").value.trim(),location:$("jobLocation").value.trim(),type:$("jobType").value,salary:$("salary").value.trim()||"Salary not specified",deadline:$("deadline").value,description:$("description").value.trim()});
 e.target.reset();$("searchInput").value="";$("locationInput").value="";$("typeFilter").value="All";renderJobs();$("formMessage").textContent="Job listing published to this demo board.";$("jobs").scrollIntoView({behavior:"smooth"});
});
$("jobList").addEventListener("click",e=>{
 const b=e.target.closest("[data-apply]");if(!b)return;const j=jobs.find(x=>x.id===Number(b.dataset.apply));if(!j)return;
 $("applyJobId").value=j.id;$("dialogTitle").textContent="Apply: "+j.title;$("dialogCompany").textContent=j.company+" · "+j.location;$("applyDialog").showModal();
});
$("closeDialog").addEventListener("click",()=>$("applyDialog").close());
$("applyDialog").addEventListener("click",e=>{if(e.target===$("applyDialog"))$("applyDialog").close()});
$("applyForm").addEventListener("submit",e=>{
 e.preventDefault();const j=jobs.find(x=>x.id===Number($("applyJobId").value));if(!j)return;
 applications.unshift({title:j.title,company:j.company,name:$("applicantName").value.trim(),email:$("applicantEmail").value.trim(),status:"Submitted"});
 e.target.reset();$("applyDialog").close();renderApplications();$("applications").scrollIntoView({behavior:"smooth"});
});
function renderApplications(){
 $("appCount").textContent=applications.length;
 $("applicationList").innerHTML=applications.length?applications.map(a=>`<div class="application"><div><strong>${safe(a.title)}</strong><br>${safe(a.company)} · ${safe(a.name)} · ${safe(a.email)}</div><span class="status">${safe(a.status)}</span></div>`).join(""):"You haven't applied to any jobs yet. Explore the roles above to get started.";
}
renderJobs();renderApplications();