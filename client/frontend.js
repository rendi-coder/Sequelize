import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.esm.browser.js'

Vue.component('Loader',{
    template:`
    <div style="display:flex;justify-content:center;align-items:center;">
        <div class="spinner-border text-primary" role="status">
            <span class="sr-only">Loading...</span>
        </div>
    </div>`
})

new Vue({
    el:'#app',

    data(){
        return{
            loading:false,
            form:{
                name:'',
                value:''
            },
            contacts:[
               
            ]
        }
    },

    computed:{
        canCreate(){
            return this.form.name.trim() && this.form.value.trim()
        }
    },

    methods:{
        async createContact(){
            const {...contact} = this.form;

            const candidate = await request('/api/contacts/','POST',contact);  
            const {id,name,value,marked} =candidate.contact
            const newContact = {id,name,value,marked}
            this.contacts.push(newContact);

            this.form.name= this.form.value ='';
        },
        async markContact(id){
            try{
            const updated = await request(`/api/contacts/${id}`,'PUT')
            if(updated){
            const contact = this.contacts.findIndex(c=>c.id===id);
            this.contacts[contact].marked = !this.contacts[contact].marked
            }
            }catch(e){
                console.log(e)
            }
        },
        async removeContact(id){
            await request(`/api/contacts/${id}`,'DELETE')
            this.contacts=this.contacts.filter(c=>c.id!==id);
        }
    },

    async mounted(){
        this.loading = true;
       const data = await request('/api/contacts')
       if(data){
           this.contacts = data;
       }
       this.loading = false;
    }
})

async function request(url,method= 'GET', data = null){
    try{
        const headers = {}
        let body

        if(data){
            headers['Content-Type'] = 'application/json'
            body = JSON.stringify(data)
        }

        const response = await fetch(url,{
           method,
           headers,
           body 
        })
        return await response.json()
    }catch (e){
        console.warn('Error',e.message);
    }
}