import { EmbedBuilder, ActionRowBuilder, ButtonBuilder, SelectMenuBuilder, ButtonStyle, ModalBuilder, TextInputBuilder, TextInputStyle, ModalSubmitInteraction, TextChannel } from "discord.js";
import { Utils } from "./Utils";

export namespace MessageUtils {
    const author = { iconURL: 'https://i.imgur.com/ATfQQi7.png', name: 'AngeLove - אנונימי' };

    export namespace EmbedMessages {
        export const StartConversationAsk = new EmbedBuilder({
            author,
            color: 0x0099ff,
            title: "אתה עומד לפתוח צ'אט אנונימי",
            description: "לחיצה על כפתור ההסכמה תתחיל צ'אט אנונימי עם אחד מחברי הצוות לקבלת עזרה, פריקה ושיתוף. כל הודעה שתכתב אצלך תופיע לאיש צוות בצ'אנל נפרד בשרת הראשי, שים לב שהמערכת אנונימית למעט מקרים העוברים על חוקי המדינה וידרשו פעולות דיווח.",
            footer: { text: "בלחיצה על כפתור ההסכמה אתה מאשר את תנאי השימוש בשרת ומודע לכך שצוות השרת אינו צוות מוסמך" }
        });
        export function newChatStaff(numberOfConversation: number) {
            return new EmbedBuilder({
                author,
                color: 0x0099ff,
                title: `צ'אט מספר ${numberOfConversation}`,
                description: `משתמש פתח צ'אט, נא לתת סיוע בהתאם!`
            });
        }

        export function newChatUser(numberOfConversation: number) {
            return new EmbedBuilder({
                author,
                color: 0xCD6870,
                title: `צ'אט מספר ${numberOfConversation}`,
                description: `היי, צוות התומכים קיבל את הודעתכם בהצלחה! כל הודעה שתשלח כאן תגיע באופן אנונימי לצוות התומכים`
            });
        }

        export function staffMemberAttached(staffMemberUsername: string) {
            return new EmbedBuilder({
                author,
                color: 0x0099ff,
                title: `הצ'אט שויך לתומכ/ים שנבחר/ו`,
                description: `כעת יש ל${staffMemberUsername} גישה מלאה לכתיבה ולעזרה בצאנל`
            });
        }

        export const ManagerTools = new EmbedBuilder({
            author,
            color: 0xdd216e,
            title: "הגדרות מנהל",
            description: "מנהל יקר, שים לב שהפרת אנונימיות של משתמש היא נושא רגיש מאוד, אם אין לך חשד כי מדובר בעבירה על אחד מחוקי המדינה ו/או פגיעה עצמית או פגיעה בסובבים את הבן אדם השתדל שלא להפר מדיניות זו"
        });

        export async function revealUserMessage(userId: string) {
            const user = await Utils.getUserByID(userId);
            return new EmbedBuilder({
                author,
                color: 0x0088ff,
                title: "פרטי המשתמש",
                description: "מנהל יקר, שים לב כי בחרת להפר את מדיניות האנונימיות - עקב כך הפרטים בהודעה בהמשך גלויים אך ורק לך",
                footer: { text: "מומלץ להנחות את אחד התומכים להמשיך לדבר עם המשתמש עד לסיום העברת המידע לגורמים הרלוונטים" }
            }).addFields([
                { name: "שם", value: user.username },
                { name: "טאג", value: user.tag },
                { name: "תיוג", value: user.toString() },
                { name: "מספר משתמש/ID", value: userId },
                { name: "קישור לתמונת הפרופיל", value: user.avatarURL() || "לא זמין" },
                { name: "קישור לבאנר הפרופיל", value: user.bannerURL() || "לא זמין" },
                { name: "האם בוט", value: user.bot ? "כן" : "לא" },
                { name: "תאריך יצירת המשתמש", value: user.createdAt.toString() },
            ])
        }

        export const changeHelper = new EmbedBuilder({
            author,
            color: 0x27A5AC,
            title: "החלף תומך",
            description: "אנא בחר מתוך הרשימה למטה את התומך שתרצה לשייך אליו את הפנייה, ניתן לבחור יותר מתומך אחד",
            footer: { text: "שים לב כי החלפה בין התומכים תשפיע על ההרשאות של התגובה שלהם בהתאם" }
        });

        export const answerOpenConversationTimeEnd = new EmbedBuilder({
            author,
            color: 0x27A5AC,
            title: "חלף הזמן",
            description: "היי, לא הצלחתי לזהות בחירה ממך, אם אתה מעוניין לפתוח צ'אט אתה תמיד מוזמן לכתוב לי פעם נוספת",
            footer: { text: "לפתיחת צ'אט אנא כתוב הודעה פעם נוספת" }
        });

        export const userChooseNo = new EmbedBuilder({
            author,
            color: 0x27A5AC,
            title: "הפעולה בוטלה",
            description: "בחרת שלא לפתוח צ'אט, אתה תמיד מוזמן לכתוב לי פעם נוספת - אני כאן",
            footer: { text: "לפתיחת צ'אט אנא כתוב הודעה פעם נוספת" }
        });

        export const helpersReseted = new EmbedBuilder({
            author,
            color: 0xD43A77,
            title: "הרשאות הוסרו",
            description: "כל הרשאות התומכים של צ'אט זה אופסו, ניתן כעת להגדיר תומכים חדשים",
        });

        export function chatClosed(closedBy: string) {
            return new EmbedBuilder({
                author,
                color: 0x27A5AC,
                title: "צ'אט נסגר",
                description: `הצ'אט נסגר על ידי ${closedBy}`,
            });
        }

        export async function ticketLog(channelTitle: string) {
            return new EmbedBuilder({
                author,
                color: 0x868686,
                title: `לוג ${channelTitle}`,
                description: "על מנת לראות את לוג השאלה יש להוריד את קובץ הhtml ולפתוח אותו על המחשב"
            });
        };

        export async function reportConversationMessage(interaction: ModalSubmitInteraction) {
            return new EmbedBuilder({
                author,
                color: 0xC91111,
                title: `דיווח על ${(interaction.channel as TextChannel).name}`,
                description: `${interaction.fields.getTextInputValue('reportCause')}`
            }).addFields([
                { name: "איש צוות מדווח", value: `${interaction.user.tag}` },
                { name: "מנהל מטפל", value: `!לא שויך מנהל!` },
            ])
        };

        export async function reportHelperMessage(interaction: ModalSubmitInteraction, helpers: string) {
            return new EmbedBuilder({
                author,
                color: 0xC91111,
                title: `דיווח על ${helpers}`,
                description: `${interaction.fields.getTextInputValue('reportHelperCause')}`
            }).addFields([
                // { name: "משתמש מדווח", value: `${interaction.user.tag}` },
                { name: "מנהל מטפל", value: `!לא שויך מנהל!` },
            ])
        };

    }

    export namespace Actions {
        export const YesNo: any = new ActionRowBuilder().addComponents([
            new ButtonBuilder({
                customId: "yes_conv",
                label: "כן",
                style: ButtonStyle.Success
            }),
            new ButtonBuilder({
                customId: "no_conv",
                label: "לא",
                style: ButtonStyle.Danger
            }),
        ]);

        export function attachReport(isAttached: boolean): any {
            return new ActionRowBuilder().addComponents(
                new ButtonBuilder({
                    customId: 'manager_attach_report',
                    label: 'שייך דיווח',
                    disabled: isAttached,
                    emoji: "🔀",
                    style: ButtonStyle.Success
                })
            );

        }
        export function tools_report_link(url: string): any {
            return new ActionRowBuilder().addComponents([
                new ButtonBuilder({
                    label: "העבר אותי לצ'אט",
                    url,
                    style: ButtonStyle.Link
                }),
            ])
        }

        export const tools_attach: any = new ButtonBuilder({
            customId: "tools_attach",
            label: "שיוך צ'אט אליי",
            emoji: "🔀",
            style: ButtonStyle.Primary
        });

        export const tools_manager: any = new ButtonBuilder({
            customId: "tools_manager",
            label: "הגדרות ניהול",
            emoji: '🧑‍💼',
            style: ButtonStyle.Success
        });

        export const tools_close: any = new ButtonBuilder({
            customId: "tools_close",
            label: "סגירת צ'אט",
            emoji: '✖️',
            style: ButtonStyle.Danger
        });

        export const tools_report: any = new ButtonBuilder({
            customId: "tools_report",
            label: "דיווח",
            emoji: '🚩',
            style: ButtonStyle.Secondary
        });

        export const user_report_helper: any = new ButtonBuilder({
            customId: "user_report_helper",
            label: "דווח על תומך",
            emoji: '🚩',
            style: ButtonStyle.Secondary
        });

        export const supporterTools: any = new ActionRowBuilder().addComponents([
            tools_attach,
            tools_close,
            tools_report,
            tools_manager,
        ]);

        export const managerTools: any = new ActionRowBuilder().addComponents([
            new ButtonBuilder({
                customId: "tools_manager_change_supporter",
                label: "החלף תומך",
                emoji: '👼',
                style: ButtonStyle.Success,
            }),
            new ButtonBuilder({
                customId: "tools_manager_reveal",
                label: "גלה משתמש",
                emoji: '👁️',
                style: ButtonStyle.Secondary,
            }),
        ]);

        export function changeHelper(helpers: any[]): any {
            const selectMenu = new SelectMenuBuilder({
                customId: "helpers_list",
                placeholder: "בחר תומך אחד או יותר",
                minValues: 1,
                maxValues: helpers.length,
            });
            helpers.forEach(helper => {
                selectMenu.addOptions({ label: helper.displayName, description: "Helper", value: helper.id, emoji: '🇭' })
            });
            return new ActionRowBuilder().addComponents(selectMenu);
        };

        export const resetHelpers = new ActionRowBuilder().addComponents(
            new ButtonBuilder({
                label: "מחק הרשאות לכל התומכים",
                customId: 'tools_reset_helpers',
                emoji: '🔄',
                style: ButtonStyle.Danger,
            })
        );

    };

    export namespace Modals {
        export const reportChatModal = new ModalBuilder({
            customId: 'reportModal',
            title: "דיווח על צ'אט חריג"
        });

        const reportCause = new TextInputBuilder({
            customId: 'reportCause',
            label: 'סיבת הדיווח',
            style: TextInputStyle.Paragraph,
            required: true
        });
        const reportCauseActionRow = new ActionRowBuilder().addComponents(reportCause) as any;
        reportChatModal.addComponents(reportCauseActionRow);

        export const reportHelperModal = new ModalBuilder({
            customId: 'reportHelperModal',
            title: "דיווח על תומך"
        });

        const reportHelperCause = new TextInputBuilder({
            customId: 'reportHelperCause',
            label: 'דיווח',
            style: TextInputStyle.Paragraph,
            required: true
        });
        const reportHelperCauseActionRow = new ActionRowBuilder().addComponents(reportHelperCause) as any;
        reportHelperModal.addComponents(reportHelperCauseActionRow);
    }

} 