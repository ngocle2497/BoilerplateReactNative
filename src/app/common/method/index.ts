import { showError, translate } from "@utils"

export const onShowErrorBase = (msg: string) => {
    showError(translate("dialog:error"), msg)
}
