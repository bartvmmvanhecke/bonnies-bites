// Illustrative idea formats, not verified destinations or community reviews.
export const travelIdeas=[
['noord-huisje','Een huisje tussen de herfstbomen','Noord','Huisje','Budget','🏡'],
['noord-airbnb','Een klein appartement, een week op je gemak','Noord','Airbnb','Make it cheap','🗝️'],
['noord-hotel','Uitslapen. Ontbijten. Niks moeten.','Noord','Hotel','Eindeloos','🛎️'],
['bretagne-camping','Nog één keer die campingkriebels','Bretagne','Camping','Make it cheap','⛺'],
['bretagne-huisje','Een huisje voor spelletjes en lange ontbijtjes','Bretagne','Huisje','Budget','🏠'],
['bourgogne-hotel','Een hotelletje als uitvalsbasis','Bourgogne','Hotel','Budget','🧳'],
['bourgogne-huisje','Samen koken in je vakantiehuis','Bourgogne','Huisje','Eindeloos','🍂'],
['centraal-airbnb','Een week wonen op een andere plek','Centraal','Airbnb','Budget','🌳'],
['centraal-camping','Buitenlucht, warme trui, campingstoel','Centraal','Camping','Make it cheap','🏕️'],
['noord-camping','Een simpel kampeerplan voor de herfst','Noord','Camping','Make it cheap','🍁']
].map(([slug,title,travelRegion,stay,budget,icon])=>({slug:'reis-'+slug,title,category:'Eropuit',country:'Frankrijk',travelRegion,stay,budget,icon,travelExample:true,example:true,author:'Voorbeeldidee',time:'Een week',quick:false,tags:'Frankrijk herfstvakantie vakantie '+travelRegion+' '+stay+' '+budget,description:'Een voorbeeld van een vakantie-idee om je voorkeuren te verkennen.',detail:`Ideeformat: ${stay.toLowerCase()} in ${travelRegion}, Frankrijk.\nBudgetstijl: ${budget}. Dit is geen geverifieerd verblijf, prijs of aanbeveling van een communitylid.\nKies een concrete plek en controleer opening, beschikbaarheid, reistijd vanaf je vertrekpunt en de weersverwachting. Er is nog geen gecontroleerde tip aan dit voorbeeld gekoppeld.`}));
