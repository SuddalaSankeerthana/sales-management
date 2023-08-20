export function getContactDetails(
  storeName: string,
  address: string,
  customerName: string,
  phoneNumber: string
) {
  return `<div class= "Section-1">
        <h3 class="font-bold">${storeName}</h3>
        <p><span class="text-black"> <Address>${address}</Address></span></p>
        <p class="Padd-left"><span class="text-black">Name: </span>${customerName}</p>
        <p class="Padd-left"><span class="text-black">Phone number: </span>${phoneNumber}</p>
        <p class="Padd-left"><span class="text-black">Date : </span>${new Date()}</p>
    </div>`;
}
