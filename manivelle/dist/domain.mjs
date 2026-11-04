export const BRANCHES = {
  charmilles: {name:'Charmilles (MACO)',address:'Chemin des Sports 87',city:'1203 Genève',phone:'+41 77 525 70 68',hours:'Du mardi au vendredi : 12h00–19h00',saturday:'10h00–15h00'},
  lancy: {name:'Lancy',address:'Avenue des Communes-Réunies 62',city:'1212 Lancy',phone:'+41 77 444 03 19',hours:'Du mardi au vendredi : 14h00–19h00'},
  meyrin: {name:'Meyrin',address:'Rue des Boudines 1',city:'1217 Meyrin',phone:'+41 77 532 52 70',hours:'Du mardi au vendredi : 14h00–19h00'},
  paquis: {name:'Pâquis',address:'Cour Royaume · Rue Royaume 10',city:'1201 Genève',phone:'+41 22 543 55 98',hours:'Du mardi au vendredi : 14h00–19h00'},
  thonex: {name:'Thônex',address:'Rue de Genève 150',city:'1226 Thônex',phone:'+41 77 534 27 38',hours:'Du mardi au vendredi : 14h00–19h00'}
};
export const CATEGORIES = [
  {name:'Travaux / Bricolage',count:2017,children:['Agrafeuses / Cloueuses','Batteries / Chargeurs pour outils électroportatifs','Carrelage / Parquet','Démolition','Échelles / Escabeaux','Équipement de protection / Vêtements','Établis / Chevalets / Serre-joints','Outils de mesure / Détecteurs / Niveaux','Outils manuels','Perceuses / Visseuses / Perforateurs','Ponceuses / Rabots','Scies / Meuleuses / Outils multifonctions']},
  {name:'Équipements électriques',count:217,children:['Adaptateurs','Multiprises / Rallonges / Enrouleurs']},
  {name:'Jardinage',count:202,children:['Arrosage / Pulvérisation','Outils à main','Outils motorisés']},
  {name:'Habitat',count:155,children:['Nettoyage / Entretien','Repassage / Vaporisation']},
  {name:'Cuisine',count:562,children:['Appareils électriques','Fondue / Raclette','Ustensiles / Vaisselle']},
  {name:'Mobilier',count:116,children:[]},
  {name:'Audio-Vidéo / Multimédia',count:155,children:['Photo / Vidéo / Audio']},
  {name:'Transports / Déménagement',count:316,children:[]},
  {name:'Sport / Outdoor',count:664,children:['Camping','Pique-nique','Sports de montagne']},
  {name:'Événements / Fêtes',count:585,children:['Audiovisuel / Sonorisation','Lumières / Ambiance','Machines de stands']},
  {name:'Loisirs / Hobbies',count:87,children:[]}
];
export const PRODUCTS = [
  {id:7824,name:'Bidon à eau 20L',asset:'18f375e1ce3f1700.jpg',branch:'thonex',category:'Sport / Outdoor',tags:['Camping','Pique-nique'],price:3,description:'Bidon à eau de 20 litres avec robinet. Pour le camping, un pique-nique ou vos événements.',specs:{Fabricant:'CAMPINGAZ','Contenance':'20 litres',Taille:'48 × 18 × 38 cm',Poids:'0,4 kg'}},
  {id:7705,name:'Bidon à eau 20L',asset:'b92e27ea22b570a6.png',branch:'charmilles',category:'Sport / Outdoor',tags:['Camping','Pique-nique'],price:3,description:'Un grand bidon pratique pour emporter de l’eau lors de vos sorties.',specs:{Contenance:'20 litres',Poids:'0,5 kg'}},
  {id:7957,name:'Dôme à pizza 6 personnes',asset:'8463509b45e213b9.avif',branch:'thonex',category:'Cuisine',tags:['Appareils électriques','Événements / Fêtes'],price:10,description:'Préparez vos mini-pizzas ensemble autour de la table. Dôme à pizza pour six personnes, avec ses spatules.',specs:{Capacité:'6 personnes',Alimentation:'230 V'}},
  {id:7679,name:'Détecteur de métaux CASATIVO',asset:'963f5805bf69086a.jpeg',branch:'thonex',category:'Travaux / Bricolage',tags:['Outils de mesure / Détecteurs / Niveaux','Loisirs / Hobbies'],price:8,description:'Détecteur de métaux avec écran et disque de recherche. Une nouvelle façon de partir à la découverte.',specs:{Fabricant:'CASATIVO',Alimentation:'Piles'}},
  {id:5480,name:'Effet lumineux LED Butterfly',asset:'f9277c60e8dd1d0d.jpg',branch:'paquis',category:'Événements / Fêtes',tags:['Lumières / Ambiance','Équipements électriques'],price:8,description:'Un effet lumineux multicolore pour donner vie à votre soirée. Ses faisceaux LED se déplacent au rythme de la musique. Idéal pour un anniversaire ou une fête entre amis.',specs:{Fabricant:'BeamZ',Alimentation:'230 V',Utilisation:'En intérieur',Inclus:'Câble d’alimentation'}},
  {id:6844,name:'Gonfleur électrique pour ballons (T)',asset:'5ef7cfe231b22f4b.jpg',branch:'thonex',category:'Événements / Fêtes',tags:['Machines de stands'],price:5,description:'Gonflez vos ballons rapidement pour préparer vos fêtes et anniversaires.',specs:{Alimentation:'230 V',Utilisation:'Ballons à air'}},
  {id:5364,name:'Kit flash de studio',asset:'1e3e18928059b70a.jpg',branch:'charmilles',category:'Audio-Vidéo / Multimédia',tags:['Photo / Vidéo / Audio'],price:15,description:'Un kit de flashs et accessoires pour réaliser vos portraits et photographies en studio.',specs:{Fabricant:'Elinchrom',Inclus:'Flashs et trépieds'}},
  {id:6657,name:'Machine à badges ronds 37mm',asset:'3c055de3329e4976.jpeg',branch:'thonex',category:'Loisirs / Hobbies',tags:['Événements / Fêtes'],price:8,description:'Personnalisez vos badges pour une association, un anniversaire ou un événement.',specs:{Diamètre:'37 mm',Utilisation:'Manuelle'}},
  {id:7758,name:'Machine à fumée PETITE – BEAMZ',asset:'1dafeb0eb93a97f6.jpeg',branch:'charmilles',category:'Événements / Fêtes',tags:['Lumières / Ambiance'],price:8,description:'Une petite machine à fumée pour mettre vos lumières en valeur lors d’une soirée.',specs:{Fabricant:'BeamZ',Alimentation:'230 V'}},
  {id:7721,name:'Machine surjeteuse AEG',asset:'eb032204ec5372e3.jpg',branch:'thonex',category:'Loisirs / Hobbies',tags:['Habitat'],price:12,description:'Réalisez des finitions soignées pour vos projets de couture avec cette surjeteuse.',specs:{Fabricant:'AEG',Alimentation:'230 V'},busyOffset:5},
  {id:7043,name:'Nettoyeur haute pression KÄRCHER K5',asset:'de2f2f42a805b9a1.jpg',branch:'charmilles',category:'Habitat',tags:['Nettoyage / Entretien','Jardinage'],price:12,description:'Nettoyeur haute pression pour les terrasses, le mobilier de jardin et les surfaces extérieures.',specs:{Fabricant:'KÄRCHER',Modèle:'K5',Alimentation:'230 V'}},
  {id:6125,name:'Nettoyeur / Injecteur / Extracteur KÄRCHER',asset:'997c916e13793f43.png',branch:'lancy',category:'Habitat',tags:['Nettoyage / Entretien'],price:12,description:'Nettoyez en profondeur vos tapis, moquettes et tissus d’ameublement.',specs:{Fabricant:'KÄRCHER',Modèle:'SE 4001'}},
  {id:5392,name:'Nintendo SWITCH 1ère génération',asset:'0abd22f7f353be52.jpg',branch:'paquis',category:'Audio-Vidéo / Multimédia',tags:['Loisirs / Hobbies'],price:10,description:'Une console à partager pour une soirée jeux entre amis ou en famille.',specs:{Fabricant:'Nintendo',Inclus:'Console, manettes, station'},busyOffset:9},
  {id:6137,name:'Perceuse à percussion / visseuse Makita',asset:'83c23f800d2d8f94.png',branch:'lancy',category:'Travaux / Bricolage',tags:['Perceuses / Visseuses / Perforateurs','Outils manuels'],price:8,description:'Percez et vissez pour donner vie à vos petits et grands projets de bricolage.',specs:{Fabricant:'Makita',Alimentation:'Batterie',Inclus:'Coffret et chargeur'}},
  {id:7353,name:'Pistolet à tufter – Tufting gun',asset:'e7f1e3da522767b8.jpeg',branch:'lancy',category:'Loisirs / Hobbies',tags:['Habitat'],price:12,description:'Créez vos propres tapis et pièces textiles avec ce pistolet à tufter.',specs:{Alimentation:'230 V',Utilisation:'Création textile'}}
];
export function todayKey(now = new Date()) { return new Intl.DateTimeFormat('en-CA',{timeZone:'Europe/Zurich',year:'numeric',month:'2-digit',day:'2-digit'}).format(now); }
export function addDays(key,n) { const d=new Date(key+'T12:00:00Z'); d.setUTCDate(d.getUTCDate()+n); return d.toISOString().slice(0,10); }
export function daysBetween(a,b) { return Math.round((Date.parse(b+'T12:00:00Z')-Date.parse(a+'T12:00:00Z'))/86400000); }
export function preparationSegments(month,today=todayKey()) {
  const offset=(new Date(month+'-01T12:00:00Z').getUTCDay()+6)%7;
  const segments=[];
  for(let day=0;day<2;day++) {
    const key=addDays(today,day);
    if(key.slice(0,7)!==month)continue;
    const index=offset+Number(key.slice(8))-1,row=Math.floor(index/7)+1,column=index%7+1,last=segments.at(-1);
    if(last&&last.row===row&&last.column+last.span===column)last.span++;
    else segments.push({row,column,span:1});
  }
  return segments;
}
export function isOpen(key,branch) { const day=new Date(key+'T12:00:00Z').getUTCDay(); return day>=2 && day<=5 || day===6 && (branch==='charmilles' || branch==='all'); }
export function earliestDate(branch,today=todayKey()) { let key=addDays(today,2); while(!isOpen(key,branch)) key=addDays(key,1); return key; }
export function validateRange(start,end,branch,{today=todayKey(),blocked=[]}={}) {
  if(!/^\d{4}-\d{2}-\d{2}$/.test(start||'') || !/^\d{4}-\d{2}-\d{2}$/.test(end||'')) return 'Choisissez une date de retrait et une date de retour.';
  if(!BRANCHES[branch] && branch!=='all') return 'Choisissez une antenne.';
  if(start<addDays(today,2)) return 'Prévoyez au moins 2 jours pour préparer votre objet.';
  if(!isOpen(start,branch) || !isOpen(end,branch)) return 'Le retrait et le retour doivent avoir lieu pendant les jours d’ouverture. Le samedi est possible uniquement à Charmilles (MACO).';
  if(daysBetween(start,end)<1) return 'Le retour doit avoir lieu après le retrait.';
  if(daysBetween(start,end)>7) return 'Un emprunt dure au maximum 7 jours.';
  if(blocked.some(b=>start<=b.end && end>=b.start)) return 'Cet objet est déjà réservé pendant cette période. Choisissez d’autres dates.';
  return '';
}
export function blockedDates(product,today=todayKey(),reservations=[]) {
  const blocks=product.busyOffset?[{start:today,end:addDays(today,product.busyOffset)}]:[];
  return blocks.concat(reservations.flatMap(r=>r.items.filter(x=>x.id===product.id).map(x=>({start:x.start,end:x.end}))));
}
export function available(product,start,end,branch,today=todayKey(),reservations=[]) {
  // Small and medium demo objects can be transferred to the selected antenna.
  const target=branch==='all'?'all':branch;
  if(!start || !end) return !blockedDates(product,today,reservations).some(b=>b.start<=today && b.end>=today);
  return !validateRange(start,end,target,{today,blocked:blockedDates(product,today,reservations)});
}
export function inactivityStatus(account,today=todayKey()) {
  if(account.warningAt && daysBetween(account.warningAt,today)>=30) return 'delete';
  if(!account.warningAt && daysBetween(account.lastActive||today,today)>=365) return 'warn';
  return 'active';
}
