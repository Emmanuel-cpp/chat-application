import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import "remixicon/fonts/remixicon.css";
@customElement("my-comment")
export class MyComment extends LitElement {
  @property({ type: String }) commentInput = "";
  @property({ type: Number }) count = 0;
  @property({ type: Array }) comments: {
    id: number;
    name: String;
    text: String;
    timeStamp: Date;
    parentId: number;
  }[] = [];
  @property({ type: Boolean })
  isCollapsed = false; // collapse page
  @property({ type: Boolean })
  isModalOpen = false; // Controls the visibility of the pop-up modal
  @property({ type: Number })
  replyingToId: number | null = null;
  //New State to hold the text of the comment being replied to (for display)
  @property({ type: String })
  quotedCommentText: string | null = null;
  @property({ type: String }) replytoInput = "";
  // add the style
  static styles = css`
body{
    width:100VW;
    font-family: Roboto; 
    background-color:blue;
    display:flex;
    background-color:blue;
  }
p{
  color:black;
  margin-bottom: 0; /* Add this line to remove space below the comment text */
  margin-top:0:
  padding:5px;/*
  margin-top:8px;
  margin-bottom:-4px ;
  margin-top:-5px;*/
}
ul{
    margin-left:1%; 
    margin-top:5px; 
    margin-buttom:10%;
    list-style-type: none; /* Removes bullet points or numbering*/
    padding: 0;    /* Removes default padding which causes indentation */ 
}
h3{
    /*hearder design*/
    margin-top:0%;
    color:black;
    padding-left:2px;
}
dialog{
    background-color:  #d3d8daff;
    border:1px solid  #bac0c2ff;
    z-index: 2;//help stop overlapping of elements, higher number of z-index means more the element will apppear first.
    //  not that all elements must be positioned, otherwise, z-index will not work
    width: 80vw;
    max-width: 500px;
    height:50vh;
    position: fixed;
    /* Center the modal on the screen */
    top: 40%;
    left: 30%;
    transform: translate(-50%, -50%);
    border-radius:5px; 
}
#line{
    background-color: grey; 
    color:  #ffffff;
    opacity: 0.2;
}
.comment-form{
    /* Container for the input and button */
    display: flex;
    /*flex-direction: column; /* Stack input and button vertically */
    gap: 10px;
    margin-bottom: 20px auto;
}
.cardContainer{
    background: white;
    padding: 11px;
    border-radius: 4px;
    box-shadow:  0 0 15px rgba(0, 0, 0.5, 0.2);
    width: 100vh;
    margin: 20px auto; /* Centers the card on the page */
    min-height: 100vh;
    alighn-item:center auto;
    margin-left:50% ;
    position:relative;
    z-index: 1;
    opacity:0.9;
}
.longCommentBox{ 
    padding: 8px;
    border-radius: 5px;
    border: 1px solid #d3d8daff;
    box-shadow: 0 0 10px rgba(-1, -1, -1, 0.1);
    width: 100%; 
    box-sizing: border-box;   
    height: 40px;
    background-color:white;
    color:black;
    /*positioning the sendBtn button*/
    position: relative; 
    display: flex;
    align-items: left;
    justify-content: space-between;
    margin-top: 0%;
    overflow-y: auto;
}
.commentInputContainer{
    position: relative; 
    display: flex; /* Helps manage the internal text area width */
    align-items: center; /* Vertically centers content if needed */
    margin-bottom: 5px;
}
/*.content{
   margin-right:1% ;
   margin-left:1% ;
}*/
#time2{
    color: #5d5c5cff;
    margin-top:0;
}
#writer{
    color: #0fa6ddff;
    font-weight:600;
}
.commentBackground{
    box-sizing: border-box;
    padding:8px;
    margin-top:2px ; 
    /*positioning the sendBtn button*/
    position: relative; 
    display: flex;
    align-items: left;
    justify-content: space-between;
    margin-top: 0%;
}
.commentBackground:hover{
    /*border: 1px solid #eee;*/
    /*box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);*/
    background-color:  #caeaf566;  
    border-radius:3px;
    /*padding-left:5px;
    margin-bottom:-4px ;
    margin-top:-5px;*/
}
.commentText {
    margin-bottom:3px;
    margin-top:-5px;
   
}
.commentMeta{
opacity:0.8;
}
.commentHeader{
    /*positon collapse button*/
    position: relative; 
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 0%;
    color: black;
    padding-left: 2px; /* Add padding-right to prevent button overlap with header text */
    padding-right: 60px
}
.collapseLine{
   box-shadow: 0 0 10px rgba(-1, -1, -1, 0.1);
   border: 3px solid #d3d8daff;
}
#replyBtn{
  border-radius: 12px;
 /* position button - REMOVE THESE LINES */
    /* position: absolute; */ 
    /* left: 60px; */ 
    /* top: 107px; */ 
    /* transform: translateY(-50%); */ 
    padding: 5px 10px;
    margin: 0; 
    cursor: pointer; 
}
#replyBtn:hover{
    color:aliceblue;
    background-color:grey;
    border:2px solid black;
    box-shadow: 0 0 16px rgba(0, 0, 0, 0.5);
}
#replyBtn:active{
    color:black;
    background-color:darkgrey;
}
#collapseBtn{
   border-radius:5px;
   background-color:black;
   padding:5px;
/* position button*/
    position: absolute; 
    right: 32px; 
    top: 50%; 
    transform: translateY(-50%); 
    padding: 5px 10px;
    margin: 0; 
    cursor: pointer; 
}
#collapseBtn:hover{
    color:aliceblue;
    background-color:grey;
    border:2px solid black;
    box-shadow: 0 0 16px rgba(0, 0, 0, 0.5);
}
#collapseBtn:active{
    color:black;
    background-color:darkgrey;
}
#sendButton{
    border-radius:5px;
    font-size: 17px ;
    font-weight:500;
    background-color:black;
    color:white;
    margin-left:2%;
     /* position button*/
    position: absolute; 
    right: 20px; 
    top: 50%; 
    transform: translateY(-50%); 
    padding: 5px 10px;
    margin: 0; 
    cursor: pointer; 
}
#sendButton:hover{
    color:aliceblue;
    background-color:grey;
    border:2px solid black;
    box-shadow: 0 0 16px rgba(0, 0, 0, 0.5);
}
#sendButton:active{
    color:black;
}
#emojis{
   border-radius: 12px;
}
#emojis:hover{
    color:aliceblue;
    background-color:grey;
    border:2px solid black;
    box-shadow: 0 0 16px rgba(0, 0, 0, 0.5);
}
#emojis:active{
    color:black;
    background-color:darkgrey;
} 
.replyToTextBtn{
    border-radius:5px;
    font-size: 17px ;
    font-weight:500;
    background-color:black;
    color:white;
    margin-left:2%;
    margin-top: 20px;
}
.replyToTextBtn:hover{
    color:aliceblue;
    background-color:grey;
    border:2px solid black;
    box-shadow: 0 0 16px rgba(0, 0, 0, 0.5);
}
.replyToTextBtn:active{
    color:black;
    background-color:darkgrey;
}
.replyIndicator{
    color:black;
    background-color: #d3d8daff;
    border-radius:12px;
    padding:10px;
    margin-buttom:50px;
}
.replyIndicator:hover{
    background-color: #d3d8daff;
    border:1px solid  #bac0c2ff;
    box-shadow: 0 0 1px rgba(0, 0, 0, 0.5);
    border-radius:8px;
}
.quotedText{
   color:black;
   background-color:   #d0e2e9a3;
   border-radius: 8px;
   padding:8px;
   margin-top:10px;
}
.originalAuther{
 margin-top:1px;
}
.replyToReference{
margin:6px;
}
.cancelReplyBtn{
border-radius: 12px;
    padding: 5px 10px;
    margin: 0; 
    cursor: pointer; 
}
.referenceTextInDialog{
  margin-bottom: 1px;
}
.modalBody {
  display: flex;
  flex-direction: column; /* Stacks children vertically */
  /* Add vertical space between children */
  gap: 15px; 
}
.replyInput{
    padding: 8px;
    border-radius: 5px;
    border: 1px solid #d3d8daff;
    box-shadow: 0 0 10px rgba(-1, -1, -1, 0.1);
    max-width:70 %; 
    box-sizing: border-box;   
    height: 40px;
    aligh-item:left;
    background-color:white;
    color:black;
    margin-top: 2px;
}
.modalHeader{
    margin-top: 2px;
    magin-buttom: 2px;
    left:90px;
    bottom:3px;
}
dialog::backdrop {
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(8px) brightness(80%);
}
.modalFooter{
    margin-top:200px;
}
  `;

  //function for getting input
  inputCmt(event: { target: { value: string } }) {
    this.commentInput = event.target.value;
  }
  //function for displaying input
  async commentSubmit() {
        if (this.commentInput.trim() !== "") {
          const userText = this.commentInput.trim();

        //send to python AI server
          const aiResponse = await fetch("http://localhost:5000/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              message: userText
            })
          });

          const data = await aiResponse.json();
          const aiText = data.reply;  
          
          // AI comment reply
          const newComment = {
            id: this.comments.length + 1,
            text: aiText,               
            timeStamp: new Date(),
            name: "AI Assistant",       
            parentId: this.replyingToId || undefined,
          };

          this.comments = [newComment, ...this.comments];
          this.commentInput = "";
          this.cancelReply();
        }
  }
  formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month is 0-indexed
    const year = date.getFullYear();

    // Combines date into the desired format
    return `${day}.${month}.${year} `;
  }
  formatTime(date: Date): string {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  }
  // ... inside YourCommentComponent class ...

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }
  handleReply(id: number, text: String) {
    this.replyingToId = id;
    this.quotedCommentText = text.toString();
    this.commentInput = " "; //clear input
    this.isModalOpen = true; //  Open the modal
  }
  cancelReply() {
    // set everything to empty to erase
    this.commentInput = " ";
    this.quotedCommentText = null;
    this.replyingToId = null;
    this.isModalOpen = false; // Close the modal`
  }
  openModel() {
    this.isModalOpen = !this.isModalOpen;
  }
  updated(changedProperties: Map<string | number | symbol, unknown>) {
    if (changedProperties.has("isModalOpen")) {
      const dialog = this.shadowRoot?.getElementById(
        "replyDialog"
      ) as HTMLDialogElement | null;
      if (dialog) {
        if (this.isModalOpen) {
          // *** FIX 1: Use showModal() to activate ::backdrop ***
          dialog.showModal();
        } else {
          dialog.close();
        }
      }
    }
  }
  // functions for displaying emoji
  increment() {
    this.count++;
  }
 
  render() {
    return html`
        <div class="cardContainer">
          <!--dialog box here-->
            ${
              this.isModalOpen
                ? html`
                    <dialog id="replyDialog">
                      <div class="modalContent">
                        <div class="modalHeader">
                          <p>Replying to:</p>
                        </div>
                        <div class="modalBody">
                          <!-- Display the quoted text -->
                          <div class="referenceTextInDialog">
                            <p class="quotedText">${this.quotedCommentText}</p>
                          </div>
                          <!-- Use the existing input function for the reply input -->
                          <textarea
                            class="replyInput"
                            .value="${this.commentInput}"
                            @input="${this.inputCmt}"
                            placeholder="Write your reply..."
                          ></textarea>
                        </div>
                        <div class="modalFooter">
                          <button
                            type="button"
                            class="replyToTextBtn"
                            @click="${this.cancelReply}"
                          >
                            Cancel
                          </button>
                          <!-- Submit the reply using the existing commentSubmit function -->
                          <button
                            type="button"
                            class="replyToTextBtn"
                            @click="${this.commentSubmit}"
                          >
                            Submit Reply
                          </button>
                        </div>
                      </div>
                    </dialog>
                  `
                : ""
            }
          <!-- End of modal dialogue block -->
          <div class="commentHeader">
            <h3>
              Comment (${this.comments.length})
              <span
                ><button
                  type="button"
                  id="collapseBtn"
                  title="collapse or expand"
                  @click="${this.toggleCollapse}"
                >
                  ${this.isCollapsed ? "Ex" : "Co"}
                </button></span
              >
            </h3>
          </div>
          ${
            this.isCollapsed
              ? html`<hr class="collapseLine" />`
              : html`<!-- Line hidden when expanded -->`
          }
          ${
            !this.isCollapsed
              ? html`
                  <div class="commentForm">
                    ${this.replyingToId !== null
                      ? html` <div class="replyToQuote">
                          <!-- remove this part and clear background instead <blockquote class="quoteToText">
                            ${this.quotedCommentText}
                          </blockquote>-->
                          <!-- remove this button as well <button
                            type="button"
                            @click="${this.cancelReply}"
                            class="cancelReplyBtn",
                          >
                            &#x2715;
                          </button>-->
                        </div>`
                      : html``}
                    <div class="commentInputContainer">
                      <input
                        id="formInput"
                        class="longCommentBox"
                        type="text"
                        .value="${this.commentInput}"
                        @input=${this.inputCmt}
                        placeholder="comment"
                      />
                      />
                      <button
                        type="button"
                        id="sendButton"
                        aria-label="Search"
                        @click=${this.commentSubmit}
                      >
                        send
                      </button>
                    </div>
                    <ul>
                      ${this.comments.map(
                        (comment) => html`
                          <li class="commentItem">
                            <div class="commentBackground">
                              <div class="commentMeta">
                                <small id="time2">
                                  <!--add time and date -->
                                  <span id="writer">${comment.name}</span>
                                  <span class="separator">&bullet;</span>
                                  <span
                                    >${this.formatDate(comment.timeStamp)}</span
                                  >
                                  <span class="separator">&bullet;</span>
                                  <span
                                    >${this.formatTime(comment.timeStamp)}</span
                                  >
                                </small>
                                <div class="replyToReference">
                                  ${comment.parentId
                                    ? html` <div class="replyIndicator">
                                  👩<small id="time2">
                                  <!--remember to add name, time and date as did on when sending the message-->
                                      ${this.formatDate(
                                        comment.timeStamp
                                      )}</span
                                    >
                                    <span class="separator">&bullet;</span>
                                    <span
                                      >${this.formatTime(
                                        comment.timeStamp
                                      )}</span
                                    >
                                  </small>
                                  <div class="originalAuther"
                                    >${
                                      this.comments.find(
                                        (c) => c.id === comment.parentId
                                      )?.text || "Comment"
                                    }</div
                                  >
                                </div>`
                                    : html``}
                                </div>
                                <p class="commentText">${comment.text}</p>
                                <button
                                  typ="button"
                                  id="emojis"
                                >😀
                                </button>
                                <button
                                  type="button"
                                  id="replyBtn"
                                  @click="${() =>
                                    this.handleReply(comment.id, comment.text)}"
                                >
                                  reply
                                </button>
                              </div>
                            </div>
                            <hr id="line" />
                          </li>
                        `
                      )}
                    </ul>
                  </div>
                `
              : html``
          }
          <!-- End of conditional rendering -->
        </div>
        </div>
    `;
  }
}
