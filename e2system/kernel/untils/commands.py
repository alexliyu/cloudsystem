from e2system.untils.queue.decorators import queue_command
from e2system.untils.utils.images import resize


@queue_command
def delayed_resize(source, dest, width, height=None):
    resize(source, dest, width, height)
