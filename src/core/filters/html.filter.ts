export class HtmlFilter {
    public strip(html:string,limitLen?:number){
        let div = document.createElement("div");
        div.innerHTML = html;
        let text = div.textContent || div.innerText || "";
        text = text.substr(0,limitLen);
        return text;
    }
}
