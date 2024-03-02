function handleSubmit(event){
    event.preventDefault();
    console.log("Form was Clicked ");
}
export default function Form(){
    return (
       <form onSubmit={handleSubmit}>
        <input placeholder="write something" />
        <button >submit</button>
       </form>
    )
}