function MsgBox({userName,textColor}){
    let color={color:textColor};
    return(
       <div>
         <>
         <h1 style={color}>Hello {userName}</h1>
        </>
       </div>
    )
}
export default MsgBox;