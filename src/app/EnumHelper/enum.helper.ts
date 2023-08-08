/* Get values of enum */

export function enumValues (e : object ) : any [] {
  const  mass = Object.values(e) ;
  return  mass.splice(mass.length / 2 , mass.length);

}
/* Convert enum values number to string  */

export  function enumToString(enumType : any  , enumValue : any ) : any {
  for (let enumMember in enumType) {
    if(enumType[enumMember] == enumValue) return enumMember ;
  }
}
